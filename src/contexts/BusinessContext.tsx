import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mockBusinesses, mockRewards } from '../data/mockData';
import { Business, Reward } from '../types';

interface BusinessContextType {
  businesses: Business[];
  rewards: Reward[];
  selectedBusiness: Business | null;
  isLoading: boolean;
  error: string | null;
  setSelectedBusiness: (business: Business | null) => void;
  createReward: (reward: Omit<Reward, 'id'>) => Promise<void>;
  updateReward: (id: string, reward: Partial<Reward>) => Promise<void>;
  deleteReward: (id: string) => Promise<void>;
  getBusinessRewards: (businessId: string) => Reward[];
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusiness = (): BusinessContextType => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load businesses and rewards from mock data
    setBusinesses(mockBusinesses);
    setRewards(mockRewards);
    
    // If user is a business, set selected business to their business
    if (user && user.type === 'business') {
      const userBusiness = mockBusinesses.find(b => b.ownerId === user.id);
      if (userBusiness) {
        setSelectedBusiness(userBusiness);
      }
    }
  }, [user]);
  
  const createReward = async (reward: Omit<Reward, 'id'>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newReward: Reward = {
        ...reward,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      setRewards(prev => [...prev, newReward]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateReward = async (id: string, rewardUpdate: Partial<Reward>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRewards(prev => 
        prev.map(reward => 
          reward.id === id ? { ...reward, ...rewardUpdate } : reward
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteReward = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRewards(prev => prev.filter(reward => reward.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getBusinessRewards = (businessId: string): Reward[] => {
    return rewards.filter(reward => reward.businessId === businessId);
  };
  
  const value = {
    businesses,
    rewards,
    selectedBusiness,
    isLoading,
    error,
    setSelectedBusiness,
    createReward,
    updateReward,
    deleteReward,
    getBusinessRewards
  };
  
  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
};