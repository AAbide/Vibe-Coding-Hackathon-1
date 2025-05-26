import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Gift, Trash2, Edit, Plus, Store, Check, ChevronDown, 
  Calendar, Clock, Filter, Tag, Percent, Gift as GiftIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useCustomer } from '../contexts/CustomerContext';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Reward } from '../types';
import CreateRewardModal from '../components/business/CreateRewardModal';

const RewardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rewards, businesses, selectedBusiness, createReward, updateReward, deleteReward } = useBusiness();
  const { customerRewards, redeemReward, getCustomerPoints } = useCustomer();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  
  // For customer view
  const [activeFilter, setActiveFilter] = useState<'available' | 'redeemed' | 'all'>('available');
  
  const userType = user?.type;
  
  // If user is a business, filter rewards to show only their rewards
  const businessRewards = userType === 'business' && selectedBusiness
    ? rewards.filter(reward => reward.businessId === selectedBusiness.id)
    : [];
  
  // If user is a customer, show rewards from businesses they've visited
  const customerVisitedBusinessIds = user && userType === 'customer'
    ? businesses
        .filter(business => getCustomerPoints(business.id) > 0)
        .map(business => business.id)
    : [];
  
  const availableBusinessRewards = userType === 'customer'
    ? rewards.filter(reward => customerVisitedBusinessIds.includes(reward.businessId))
    : [];
  
  // Customer's rewards
  const customerOwnedRewards = userType === 'customer'
    ? customerRewards
    : [];
  
  // Filter customer rewards based on active filter
  const filteredCustomerRewards = userType === 'customer'
    ? activeFilter === 'available'
      ? customerOwnedRewards.filter(r => !r.redeemed)
      : activeFilter === 'redeemed'
      ? customerOwnedRewards.filter(r => r.redeemed)
      : customerOwnedRewards
    : [];
  
  const handleEditReward = (reward: Reward) => {
    setEditingReward(reward);
    setShowCreateModal(true);
  };
  
  const handleDeleteReward = async (rewardId: string) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      await deleteReward(rewardId);
    }
  };
  
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingReward(null);
  };
  
  const handleSaveReward = async (rewardData: Omit<Reward, 'id'>) => {
    try {
      if (editingReward) {
        await updateReward(editingReward.id, rewardData);
      } else {
        await createReward(rewardData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving reward:', error);
    }
  };
  
  const handleRedeemReward = async (rewardId: string) => {
    try {
      await redeemReward(rewardId);
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
    }
  }, [user, navigate]);
  
  // Render business view
  if (userType === 'business') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Rewards</h1>
            <p className="text-gray-600">Create and manage rewards for your loyal customers.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              leftIcon={<Plus size={16} />}
              onClick={() => setShowCreateModal(true)}
            >
              Create New Reward
            </Button>
          </div>
        </div>
        
        {businessRewards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Award size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">No Rewards Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first reward to encourage customer loyalty. Rewards can be discounts, free items, or special services.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              Create Your First Reward
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessRewards.map(reward => (
              <Card key={reward.id}>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award size={20} className="text-purple-600" />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Tag size={16} className="mr-2" />
                      <span>{reward.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Gift size={16} className="mr-2" />
                      <span>Required Points: <strong>{reward.pointsRequired}</strong></span>
                    </div>
                    {reward.expiryDays && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <span>Expires after {reward.expiryDays} days</span>
                      </div>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    leftIcon={<Edit size={16} />}
                    onClick={() => handleEditReward(reward)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    leftIcon={<Trash2 size={16} />}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteReward(reward.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Analytics Card */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reward Analytics</h2>
          <Card>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Rewards</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{businessRewards.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Redemptions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Points Required</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {businessRewards.length > 0
                      ? Math.round(
                          businessRewards.reduce((sum, r) => sum + r.pointsRequired, 0) / businessRewards.length
                        )
                      : 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Popular</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {businessRewards.length > 0 ? '10% Discount' : '-'}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Create/Edit Reward Modal */}
        {showCreateModal && (
          <CreateRewardModal 
            onClose={handleCloseModal}
            onSave={handleSaveReward}
            editingReward={editingReward}
            businessId={selectedBusiness?.id || ''}
          />
        )}
      </div>
    );
  }
  
  // Render customer view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Rewards</h1>
          <p className="text-gray-600">View and redeem rewards from your favorite businesses.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button 
            variant={activeFilter === 'available' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('available')}
          >
            Available
          </Button>
          <Button 
            variant={activeFilter === 'redeemed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('redeemed')}
          >
            Redeemed
          </Button>
          <Button 
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
        </div>
      </div>
      
      {/* My Rewards */}
      <div className="mb-12">
        {filteredCustomerRewards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <GiftIcon size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {activeFilter === 'available' 
                ? "You don't have any available rewards yet" 
                : activeFilter === 'redeemed'
                ? "You haven't redeemed any rewards yet"
                : "You don't have any rewards yet"}
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {activeFilter === 'available' 
                ? "Visit businesses and earn points to get rewards!" 
                : activeFilter === 'redeemed'
                ? "Redeem some of your available rewards to see them here."
                : "Visit businesses and earn points to get rewards!"}
            </p>
            <Button onClick={() => navigate('/check-in')}>
              Check In Now
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomerRewards.map(customerReward => {
              const reward = rewards.find(r => r.id === customerReward.rewardId);
              const business = reward ? businesses.find(b => b.id === reward.businessId) : null;
              
              if (!reward || !business) return null;
              
              return (
                <Card key={customerReward.id} className={customerReward.redeemed ? 'opacity-75' : ''}>
                  <div className={`absolute top-2 right-2 p-1 rounded-full ${customerReward.redeemed ? 'bg-gray-100' : 'bg-green-100'}`}>
                    {customerReward.redeemed 
                      ? <Clock size={16} className="text-gray-600" />
                      : <Check size={16} className="text-green-600" />
                    }
                  </div>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <Award size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Store size={14} className="mr-1" />
                          <span>{business.name}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600 mb-3">{reward.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Tag size={16} className="mr-2" />
                        <span>{reward.type}</span>
                      </div>
                      {customerReward.redeemed ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>Redeemed on {new Date(customerReward.redeemedDate || '').toLocaleDateString()}</span>
                        </div>
                      ) : customerReward.expiryDate ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>Expires on {new Date(customerReward.expiryDate).toLocaleDateString()}</span>
                        </div>
                      ) : null}
                    </div>
                  </CardBody>
                  <CardFooter>
                    {customerReward.redeemed ? (
                      <span className="text-sm text-gray-500 italic">This reward has been redeemed</span>
                    ) : (
                      <Button fullWidth>Use Reward</Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Available Rewards */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Rewards You Can Earn</h2>
        {availableBusinessRewards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">
              Visit businesses to see rewards you can earn!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableBusinessRewards.map(reward => {
              const business = businesses.find(b => b.id === reward.businessId);
              const customerPoints = business ? getCustomerPoints(business.id) : 0;
              const canRedeem = customerPoints >= reward.pointsRequired;
              
              return (
                <Card key={reward.id} className={!canRedeem ? 'opacity-75' : ''}>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <Award size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Store size={14} className="mr-1" />
                          <span>{business?.name || 'Unknown Business'}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600 mb-3">{reward.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Tag size={16} className="mr-2" />
                        <span>{reward.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Gift size={16} className="mr-2" />
                        <span>Required Points: <strong>{reward.pointsRequired}</strong></span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${canRedeem ? 'bg-green-500' : 'bg-purple-500'}`}
                          style={{ width: `${Math.min(100, (customerPoints / reward.pointsRequired) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Your points: {customerPoints}</span>
                        <span>{Math.max(0, reward.pointsRequired - customerPoints)} more needed</span>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button 
                      fullWidth 
                      disabled={!canRedeem}
                      onClick={() => handleRedeemReward(reward.id)}
                    >
                      {canRedeem ? 'Redeem Reward' : 'Earn More Points'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;