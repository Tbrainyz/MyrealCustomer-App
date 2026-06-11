export const pricingPlans = [
  {
    name:    'Starter',
    monthly: 9900,
    yearly:  7900,
    color:   '#4F46E5',
    popular: false,
    paystackPlanMonthly: '', // fill after creating Paystack plans
    paystackPlanYearly:  '',
    features: [
      '5,000 messages/month',
      '3 messaging channels',
      'Basic automation',
      '1,000 CRM contacts',
      'Invoice management',
      'Analytics dashboard',
      'Email support',
      '2 team members',
    ],
  },
  {
    name:    'Professional',
    monthly: 24900,
    yearly:  19900,
    color:   '#06B6D4',
    popular: true,
    paystackPlanMonthly: '',
    paystackPlanYearly:  '',
    features: [
      '50,000 messages/month',
      'All channels',
      'Advanced automation',
      '25,000 CRM contacts',
      'Inventory management',
      'Financial tracking',
      'Priority support',
      '10 team members',
      'AI personalization',
      'Custom templates',
    ],
  },
  {
    name:    'Enterprise',
    monthly: 59900,
    yearly:  47900,
    color:   '#10B981',
    popular: false,
    paystackPlanMonthly: '',
    paystackPlanYearly:  '',
    features: [
      'Unlimited messages',
      'All channels + API',
      'Custom automations',
      'Unlimited contacts',
      'Advanced inventory',
      'Full financial suite',
      '24/7 dedicated support',
      'Unlimited team members',
      'Custom AI models',
      'White-labeling',
      'SLA guarantee',
    ],
  },
];

export const faqData = [
  {
    q: 'How quickly can I get started?',
    a: 'You can be live in under 10 minutes. Connect WhatsApp, Instagram, and Facebook, import your contacts, and start messaging — no technical setup required.',
  },
  {
    q: 'Do I need technical skills to use automations?',
    a: 'Not at all. Our visual workflow builder uses drag-and-drop logic. Build complex automation sequences without writing a single line of code.',
  },
  {
    q: 'What channels does the platform support?',
    a: 'WhatsApp Business, Instagram DMs, Facebook Messenger, SMS, Email, and TikTok — with new channels added regularly. Manage all from one unified inbox.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Pricing is based on your selected plan billed monthly or yearly. Yearly plans save you 20%. All plans include full access to your role features with no hidden fees.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately and downgrades apply at the next billing cycle.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We use AES-256 encryption at rest and in transit. Your data is never shared or sold to third parties.',
  },
];
