import React, { useState, useEffect } from 'react';
import { X, Award, Tag, CalendarDays, DollarSign, Percent, Gift } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Reward } from '../../types';

interface CreateRewardModalProps {
  onClose: () => void;
  onSave: (reward: Omit<Reward, 'id'>) => Promise<void>;
  editingReward: Reward | null;
  businessId: string;
}

const CreateRewardModal: React.FC<CreateRewardModalProps> = ({ 
  onClose, 
  onSave, 
  editingReward, 
  businessId 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'discount' | 'freeItem' | 'service'>('discount');
  const [pointsRequired, setPointsRequired] = useState('500');
  const [expiryDays, setExpiryDays] = useState('30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (editingReward) {
      setName(editingReward.name);
      setDescription(editingReward.description);
      setType(editingReward.type as 'discount' | 'freeItem' | 'service');
      setPointsRequired(editingReward.pointsRequired.toString());
      setExpiryDays(editingReward.expiryDays?.toString() || '30');
    }
  }, [editingReward]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      if (!name.trim()) {
        setError('Reward name is required');
        return;
      }
      
      if (!description.trim()) {
        setError('Description is required');
        return;
      }
      
      const points = parseInt(pointsRequired, 10);
      if (isNaN(points) || points <= 0) {
        setError('Points required must be a positive number');
        return;
      }
      
      const expiry = parseInt(expiryDays, 10);
      if (isNaN(expiry) || expiry <= 0) {
        setError('Expiry days must be a positive number');
        return;
      }
      
      const rewardData: Omit<Reward, 'id'> = {
        businessId,
        name: name.trim(),
        description: description.trim(),
        type,
        pointsRequired: points,
        expiryDays: expiry,
        active: true,
        createdAt: new Date().toISOString()
      };
      
      await onSave(rewardData);
      onClose();
    } catch (err) {
      setError('Failed to save reward. Please try again.');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingReward ? 'Edit Reward' : 'Create New Reward'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <Input
              label="Reward Name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., 10% Off Next Visit"
              leftIcon={<Award size={16} />}
              required
              fullWidth
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what the customer gets with this reward"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reward Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                  type === 'discount' 
                    ? 'bg-purple-50 border-purple-200 text-purple-700' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setType('discount')}
              >
                <Percent size={20} className={type === 'discount' ? 'text-purple-600' : 'text-gray-400'} />
                <span className="text-xs mt-1">Discount</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                  type === 'freeItem' 
                    ? 'bg-purple-50 border-purple-200 text-purple-700' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setType('freeItem')}
              >
                <Gift size={20} className={type === 'freeItem' ? 'text-purple-600' : 'text-gray-400'} />
                <span className="text-xs mt-1">Free Item</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                  type === 'service' 
                    ? 'bg-purple-50 border-purple-200 text-purple-700' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setType('service')}
              >
                <Tag size={20} className={type === 'service' ? 'text-purple-600' : 'text-gray-400'} />
                <span className="text-xs mt-1">Service</span>
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <Input
              label="Points Required"
              type="number"
              id="pointsRequired"
              value={pointsRequired}
              onChange={(e) => setPointsRequired(e.target.value)}
              placeholder="500"
              leftIcon={<Award size={16} />}
              required
              fullWidth
            />
          </div>
          
          <div className="mb-6">
            <Input
              label="Expiry Days (after earning)"
              type="number"
              id="expiryDays"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              placeholder="30"
              leftIcon={<CalendarDays size={16} />}
              required
              fullWidth
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              isLoading={loading}
              className="flex-1"
            >
              {editingReward ? 'Update Reward' : 'Create Reward'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRewardModal;