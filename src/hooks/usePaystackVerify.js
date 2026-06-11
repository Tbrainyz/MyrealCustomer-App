import { useState } from 'react';
import { paymentsAPI } from '../api';
import toast from 'react-hot-toast';

// ─── usePaystackVerify ────────────────────────────────────────────────────────
// Handles calling the backend /payments/paystack/verify after Paystack popup
// confirms a payment. Returns { verifying, verify }.
//
// Usage:
//   const { verifying, verify } = usePaystackVerify();
//   <PaystackButton onSuccess={(ref) => verify(ref.reference, onDone)} />

export default function usePaystackVerify() {
  const [verifying, setVerifying] = useState(false);

  const verify = async (reference, onDone) => {
    setVerifying(true);
    const toastId = toast.loading('Verifying payment...');
    try {
      const res = await paymentsAPI.verify({ reference });
      toast.success('Payment verified! Invoice marked as paid.', { id: toastId });
      onDone?.(res.data?.data);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Payment verification failed';
      toast.error(msg, { id: toastId });
      console.error('Verify error:', err);
    } finally {
      setVerifying(false);
    }
  };

  return { verifying, verify };
}
