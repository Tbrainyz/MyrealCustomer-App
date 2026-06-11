import { useState } from 'react';
import { CreditCard } from 'lucide-react';

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.PaystackPop) {
      console.log('✅ PaystackPop already available');
      return resolve();
    }

    // Script tag already in DOM but not loaded yet
    const existing = document.getElementById('paystack-script');
    if (existing) {
      console.log('⏳ Paystack script tag exists, waiting...');
      existing.addEventListener('load', () => { console.log('✅ Paystack script loaded'); resolve(); });
      existing.addEventListener('error', (e) => { console.error('❌ Paystack script error', e); reject(new Error('Script load error')); });
      return;
    }

    console.log('📥 Injecting Paystack script...');
    const script    = document.createElement('script');
    script.id       = 'paystack-script';
    script.src      = 'https://js.paystack.co/v1/inline.js';
    script.async    = true;

    const timer = setTimeout(() => {
      console.error('⏱ Paystack script load TIMEOUT after 10s');
      reject(new Error('timeout'));
    }, 10000);

    script.onload = () => {
      clearTimeout(timer);
      console.log('✅ Paystack script loaded successfully');
      console.log('PaystackPop available?', !!window.PaystackPop);
      resolve();
    };
    script.onerror = (e) => {
      clearTimeout(timer);
      console.error('❌ Paystack script failed to load', e);
      reject(new Error('Script failed to load'));
    };

    document.head.appendChild(script);
    console.log('📌 Script tag added to head:', script.src);
  });
}

export default function PaystackButton({ invoice, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handlePay = async () => {
    setError('');

    if (!invoice.clientEmail) {
      alert('This invoice has no client email. Please add one before collecting payment.');
      return;
    }

    console.log('💳 Paystack: starting payment for invoice', invoice.invoiceNumber);
    console.log('   Amount:', invoice.total, '→', Math.round((invoice.total || 0) * 100), 'kobo');
    console.log('   Email:', invoice.clientEmail);
    console.log('   Public key set?', !!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
    console.log('   Public key:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.slice(0, 20) + '...');

    setLoading(true);

    try {
      await loadPaystackScript();
    } catch (err) {
      console.error('Script load failed:', err.message);
      setLoading(false);
      setError('Could not load Paystack. Check your internet connection.');
      return;
    }

    if (!window.PaystackPop) {
      console.error('❌ PaystackPop still not available after script load');
      setLoading(false);
      setError('Paystack not available. Please refresh and try again.');
      return;
    }

    setLoading(false);

    const reference  = `INV-${invoice.invoiceNumber}-${Date.now()}`;
    const amountKobo = Math.round((invoice.total || 0) * 100);

    console.log('🚀 Opening Paystack popup with ref:', reference);

    try {
      const handler = window.PaystackPop.setup({
        key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email:    invoice.clientEmail,
        amount:   amountKobo,
        currency: 'NGN',
        ref:      reference,
        metadata: {
          custom_fields: [
            { display_name: 'Invoice', variable_name: 'invoice_number', value: invoice.invoiceNumber },
            { display_name: 'Client',  variable_name: 'client',         value: invoice.client },
          ],
        },
        callback: (response) => {
          console.log('✅ Paystack callback success:', response);
          onSuccess?.(response.reference);
        },
        onClose: () => {
          console.log('ℹ️ Paystack popup closed by user');
          onClose?.();
        },
      });

      handler.openIframe();
      console.log('🪟 openIframe() called');
    } catch (err) {
      console.error('❌ Paystack setup/openIframe error:', err);
      setError(`Paystack error: ${err.message}`);
    }
  };

  const isPaid = invoice.status === 'paid';

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handlePay}
        disabled={loading || isPaid}
        title={
          isPaid          ? 'Already paid' :
          !invoice.clientEmail ? 'Add client email first' :
          `Collect ₦${(invoice.total || 0).toLocaleString()}`
        }
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
          bg-gradient-to-r from-emerald-500 to-green-500 text-white
          hover:from-emerald-400 hover:to-green-400
          hover:shadow-lg hover:shadow-emerald-500/25
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Loading Paystack...
          </>
        ) : isPaid ? (
          '✓ Paid'
        ) : (
          <><CreditCard size={13} /> Collect Payment</>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-400 max-w-[200px] leading-tight">{error}</p>
      )}
    </div>
  );
}
