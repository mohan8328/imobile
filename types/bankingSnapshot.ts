export type BankingSnapshot = {
  version: number;
  updatedAt: string;
  user: {
    firstName: string;
    fullName?: string;
    place?: string;
    customerId: string;
    email?: string;
    mobile?: string;
  };
  savingsAccount: {
    accountType: string;
    accountNumber: string;
    availableBalance: number;
    currency: string;
    branch?: string;
  };
  creditCard: {
    cardName: string;
    maskedNumber: string;
    creditLimit: number;
    outstanding: number;
    currency: string;
    network?: string;
    billingCycleEnds?: string;
    minimumDue?: number;
    rewardPoints?: number;
  };
  manageCardActions: { id: string; title: string; subtitle: string }[];
  billers: {
    id: string;
    name: string;
    category: string;
    consumerNo?: string;
    amountDue: number;
  }[];
  rechargeOperators: { id: string; name: string; type: string }[];
  scanPayHelp: {
    title: string;
    bullets: string[];
    npciUrl: string;
  };
  menuItems: {
    id: string;
    title: string;
    subtitle: string;
    link?: string;
    action?: string;
  }[];
};
