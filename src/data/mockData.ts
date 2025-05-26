import { Business, Reward, Visit, CustomerReward } from '../types';

// Mock Businesses
export const mockBusinesses: Business[] = [
  {
    id: 'biz1',
    name: 'Bella\'s Salon',
    ownerId: 'owner1',
    address: '123 Main St, Anytown, USA',
    phone: '555-123-4567',
    email: 'bella@bellasalon.com',
    category: 'salon',
    createdAt: new Date(2023, 1, 15).toISOString()
  },
  {
    id: 'biz2',
    name: 'Joe\'s Coffee',
    ownerId: 'owner2',
    address: '456 Oak Ave, Anytown, USA',
    phone: '555-987-6543',
    email: 'joe@joescoffee.com',
    category: 'cafe',
    createdAt: new Date(2023, 3, 10).toISOString()
  },
  {
    id: 'biz3',
    name: 'Ted\'s Barber Shop',
    ownerId: 'owner3',
    address: '789 Elm St, Anytown, USA',
    phone: '555-456-7890',
    email: 'ted@tedsbarbershop.com',
    category: 'barbershop',
    createdAt: new Date(2023, 5, 22).toISOString()
  }
];

// Mock Rewards
export const mockRewards: Reward[] = [
  {
    id: 'reward1',
    businessId: 'biz1',
    name: '10% Off Next Visit',
    description: 'Get 10% off your next salon service.',
    type: 'discount',
    pointsRequired: 500,
    expiryDays: 30,
    active: true,
    createdAt: new Date(2023, 2, 1).toISOString()
  },
  {
    id: 'reward2',
    businessId: 'biz1',
    name: 'Free Hair Product',
    description: 'Choose any retail product under $25.',
    type: 'freeItem',
    pointsRequired: 1000,
    expiryDays: 60,
    active: true,
    createdAt: new Date(2023, 2, 1).toISOString()
  },
  {
    id: 'reward3',
    businessId: 'biz2',
    name: 'Free Coffee',
    description: 'Enjoy any size coffee on the house!',
    type: 'freeItem',
    pointsRequired: 400,
    expiryDays: 15,
    active: true,
    createdAt: new Date(2023, 4, 5).toISOString()
  },
  {
    id: 'reward4',
    businessId: 'biz2',
    name: '50% Off Pastry',
    description: 'Get half off any pastry with a coffee purchase.',
    type: 'discount',
    pointsRequired: 200,
    expiryDays: 15,
    active: true,
    createdAt: new Date(2023, 4, 5).toISOString()
  },
  {
    id: 'reward5',
    businessId: 'biz3',
    name: 'Free Haircut',
    description: 'Get your next haircut free after 10 visits.',
    type: 'service',
    pointsRequired: 1000,
    expiryDays: 90,
    active: true,
    createdAt: new Date(2023, 6, 10).toISOString()
  }
];

// Mock Visits
export const mockVisits: Visit[] = [
  {
    id: 'visit1',
    customerId: 'customer123',
    businessId: 'biz1',
    points: 100,
    date: new Date(2023, 6, 1).toISOString()
  },
  {
    id: 'visit2',
    customerId: 'customer123',
    businessId: 'biz1',
    points: 100,
    date: new Date(2023, 6, 15).toISOString()
  },
  {
    id: 'visit3',
    customerId: 'customer123',
    businessId: 'biz2',
    points: 50,
    date: new Date(2023, 6, 5).toISOString()
  },
  {
    id: 'visit4',
    customerId: 'customer123',
    businessId: 'biz2',
    points: 50,
    date: new Date(2023, 6, 12).toISOString()
  },
  {
    id: 'visit5',
    customerId: 'customer123',
    businessId: 'biz2',
    points: 50,
    date: new Date(2023, 6, 19).toISOString()
  },
  {
    id: 'visit6',
    customerId: 'customer123',
    businessId: 'biz3',
    points: 100,
    date: new Date(2023, 6, 3).toISOString()
  },
  {
    id: 'visit7',
    customerId: 'customer123',
    businessId: 'biz3',
    points: 100,
    date: new Date(2023, 6, 17).toISOString()
  }
];

// Mock Customer Rewards
export const mockCustomerRewards: CustomerReward[] = [
  {
    id: 'cr1',
    customerId: 'customer123',
    rewardId: 'reward3',
    redeemed: false,
    redeemedDate: null,
    expiryDate: new Date(2023, 7, 25).toISOString()
  },
  {
    id: 'cr2',
    customerId: 'customer123',
    rewardId: 'reward4',
    redeemed: true,
    redeemedDate: new Date(2023, 6, 20).toISOString(),
    expiryDate: new Date(2023, 7, 5).toISOString()
  }
];