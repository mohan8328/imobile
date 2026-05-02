/** Static demo data — replace with API responses later */
export const MOCK_USER = {
  firstName: 'Mohan',
};

export const MOCK_SAVINGS_ACCOUNT = {
  accountType: 'Savings Account',
  accountNumber: '5010XXXXXX7890',
  availableBalance: 1_25_430.5,
  currency: 'INR' as const,
};

export const MOCK_CREDIT_CARD = {
  cardName: 'ICICI Bank Credit Card',
  maskedNumber: 'XXXX XXXX XXXX 4521',
  creditLimit: 50_000,
  outstanding: 0,
  currency: 'INR' as const,
};
