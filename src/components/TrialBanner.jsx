import { useNavigate } from 'react-router-dom';
import { Clock, X, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSubscription } from '../context/SubscriptionContext';
import { useState } from 'react';

export default function TrialBanner() {
  const { dark }  = useTheme();
  const navigate  = useNavigate();
  const { isTrialActive, isSubscribed, trialDaysLeft, bypassTrial } = useSubscription();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if subscribed, bypassed, or dismissed
  if (isSubscribed || bypassTrial || dismissed || !isTrialActive) return null;

  const urgent = trialDaysLeft <= 1;
  const warn   = trialDaysLeft === 2;

  const bg = urgent
    ? dark ? 'bg-red-500/10 border-red-500/30'    : 'bg-red-50 border-red-200'
    : warn
      ? dark ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'
      : dark ? 'bg-primary-500/10 border-primary-500/20' : 'bg-indigo-50 border-indigo-200';

  const textColor = urgent
    ? dark ? 'text-red-300'    : 'text-red-700'
    : warn
      ? dark ? 'text-yellow-300' : 'text-yellow-700'
      : dark ? 'text-indigo-300' : 'text-indigo-700';

  const label = trialDaysLeft === 0
    ? 'Trial expires today!'
    : trialDaysLeft === 1
      ? '1 day left in your trial'
      : `${trialDaysLeft} days left in your trial`;

  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-2.5 border-b text-sm ${bg}`}>
      <div className="flex items-center gap-2.5">
        <Clock size={14} className={textColor} />
        <span className={`font-medium ${textColor}`}>{label}</span>
        <span className={`hidden sm:inline ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          — Subscribe to keep full access after your trial ends.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate('/?scroll=pricing')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white
            bg-gradient-to-r from-indigo-600 to-violet-600
            hover:from-indigo-500 hover:to-violet-500 transition-all"
        >
          <Zap size={11} /> Subscribe Now
        </button>
        <button
          onClick={() => setDismissed(true)}
          className={`p-1 rounded-lg transition-colors ${dark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
