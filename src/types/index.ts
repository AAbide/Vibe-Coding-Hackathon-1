export interface Business {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  phone: string;
  email: string;
  category: string;
  logo?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  businessId: string;
  name: string;
  description: string;
  type: 'discount' | 'freeItem' | 'service';
  pointsRequired: number;
  expiryDays?: number;
  active: boolean;
  createdAt: string;
}

export interface Visit {
  id: string;
  customerId: string;
  businessId: string;
  points: number;
  date: string;
}

export interface CustomerReward {
  id: string;
  customerId: string;
  rewardId: string;
  redeemed: boolean;
  redeemedDate: string | null;
  expiryDate: string | null;
}