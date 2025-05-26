import React, { useState } from 'react';
import { X, User, Phone, CheckCircle, Plus, Minus } from 'lucide-react';
import { useCustomer } from '../../contexts/CustomerContext';
import Button from '../ui/Button';

interface CustomerVisitModalProps {
  customer: {
    id: string;
    name: string;
    phone: string;
  };
  business: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

const CustomerVisitModal: React.FC<CustomerVisitModalProps> = ({ customer, business, onClose }) => {
  const { recordVisit, getCustomerPoints } = useCustomer();
  const [points, setPoints] = useState(100);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleIncreasePoints = () => {
    setPoints(prev => prev + 50);
  };
  
  const handleDecreasePoints = () => {
    if (points > 50) {
      setPoints(prev => prev - 50);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await recordVisit(business.id, points);
      setSuccess(true);
    } catch (error) {
      console.error('Error recording visit:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Record Customer Visit</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        {success ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Recorded Successfully!</h3>
            <p className="text-gray-600 mb-6">
              You've awarded {points} points to {customer.name}.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-1" />
                    <span>{customer.phone}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Points:</span>
                  <span className="font-medium text-gray-900">{getCustomerPoints(business.id)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points to Award
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleDecreasePoints}
                  disabled={points <= 50}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <div className="px-4 py-2 text-center border-t border-b border-gray-300 w-20">
                  <span className="text-lg font-semibold">{points}</span>
                </div>
                <button
                  type="button"
                  onClick={handleIncreasePoints}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Details (Optional)
              </label>
              <textarea
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Haircut, Meal purchase, etc."
              ></textarea>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                isLoading={loading}
                className="flex-1"
              >
                Record Visit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerVisitModal;