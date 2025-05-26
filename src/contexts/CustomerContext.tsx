import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mockVisits, mockCustomerRewards } from '../data/mockData';
import { Visit, CustomerReward } from '../types';

interface CustomerContextType {
  visits: Visit[];
  customerRewards: CustomerReward[];
  isLoading: boolean;
  error: string | null;
  recordVisit: (businessId: string, points: number) => Promise<void>;
  redeemReward: (rewardId: string) => Promise<void>;
  getCustomerVisits: () => Visit[];
  getBusinessVisits: (businessId: string) => Visit[];
  getCustomerRewards: () => CustomerReward[];
  getCustomerPoints: (businessId: string) => number;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [customerRewards, setCustomerRewards] = useState<CustomerReward[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setVisits(mockVisits);
    setCustomerRewards(mockCustomerRewards);
  }, []);
  
  const recordVisit = async (businessId: string, points: number): Promise<void> => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      setIsLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newVisit: Visit = {
        id: Math.random().toString(36).substring(2, 9),
        customerId: user.id,
        businessId,
        points,
        date: new Date().toISOString()
      };
      
      setVisits(prev => [...prev, newVisit]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const redeemReward = async (rewardId: string): Promise<void> => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      setIsLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCustomerReward: CustomerReward = {
        id: Math.random().toString(36).substring(2, 9),
        customerId: user.id,
        rewardId,
        redeemed: false,
        redeemedDate: null,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };
      
      setCustomerRewards(prev => [...prev, newCustomerReward]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getCustomerVisits = (): Visit[] => {
    if (!user) return [];
    return visits.filter(visit => visit.customerId === user.id);
  };
  
  const getBusinessVisits = (businessId: string): Visit[] => {
    return visits.filter(visit => visit.businessId === businessId);
  };
  
  const getCustomerRewards = (): CustomerReward[] => {
    if (!user) return [];
    return customerRewards.filter(reward => reward.customerId === user.id);
  };
  
  const getCustomerPoints = (businessId: string): number => {
    if (!user) return 0;
    return visits
      .filter(visit => visit.customerId === user.id && visit.businessId === businessId)
      .reduce((total, visit) => total + visit.points, 0);
  };
  
  const value = {
    visits,
    customerRewards,
    isLoading,
    error,
    recordVisit,
    redeemReward,
    getCustomerVisits,
    getBusinessVisits,
    getCustomerRewards,
    getCustomerPoints
  };
  
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};