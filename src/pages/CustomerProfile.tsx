import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Store, Phone, Mail, User, QrCode, 
  BarChart2, Calendar, Clock, MapPin, ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useCustomer } from '../contexts/CustomerContext';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';

const CustomerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { businesses } = useBusiness();
  const { getCustomerVisits, getCustomerPoints, getCustomerRewards } = useCustomer();
  
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');
  
  // Redirect if not a customer user
  React.useEffect(() => {
    if (user && user.type !== 'customer') {
      navigate('/');
    }
  }, [user, navigate]);
  
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-8">Please log in to view your profile.</p>
          <Button onClick={() => navigate('/?login=true')}>Log In</Button>
        </div>
      </div>
    );
  }
  
  const customerVisits = getCustomerVisits();
  
  // Group visits by business
  const visitsByBusiness = businesses.map(business => {
    const businessVisits = customerVisits.filter(visit => visit.businessId === business.id);
    const points = getCustomerPoints(business.id);
    const visitsCount = businessVisits.length;
    const lastVisit = businessVisits.length > 0 
      ? new Date(Math.max(...businessVisits.map(v => new Date(v.date).getTime())))
      : null;
    
    return {
      business,
      visitsCount,
      points,
      lastVisit
    };
  }).filter(b => b.visitsCount > 0);
  
  // Recent visits across all businesses
  const recentVisits = [...customerVisits]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Available rewards
  const customerRewards = getCustomerRewards();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-32 md:h-48"></div>
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-12">
            <div className="inline-block h-24 w-24 rounded-full ring-4 ring-white bg-white overflow-hidden">
              <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                <User size={48} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1">
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-1" />
                  <span>{user.phone || '555-123-4567'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-1" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex">
              <Button 
                variant="outline" 
                leftIcon={<QrCode size={16} />}
                onClick={() => navigate('/check-in')}
              >
                My QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{customerVisits.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Store size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-gray-500">Across {visitsByBusiness.length} businesses</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {customerVisits.reduce((sum, visit) => sum + visit.points, 0)}
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <BarChart2 size={20} className="text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-gray-500">Keep visiting to earn more!</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rewards Available</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {customerRewards.filter(r => !r.redeemed).length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Award size={20} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Button 
                variant="text" 
                size="sm" 
                className="p-0 h-auto" 
                onClick={() => navigate('/rewards')}
              >
                View My Rewards
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-4 border-b-2 font-medium text-sm ${
            activeTab === 'rewards'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('rewards')}
        >
          My Rewards Progress
        </button>
        <button
          className={`ml-8 py-3 px-4 border-b-2 font-medium text-sm ${
            activeTab === 'history'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Visit History
        </button>
      </div>
      
      {/* Rewards Progress Content */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {visitsByBusiness.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
                <Store size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits yet</h3>
              <p className="text-gray-600 mb-6">
                Visit one of our partner businesses to start earning rewards!
              </p>
              <Button>Find Nearby Businesses</Button>
            </div>
          ) : (
            visitsByBusiness.map(({ business, points, visitsCount, lastVisit }) => (
              <Card key={business.id} hover className="transition-all duration-200">
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Store size={32} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{business.address}</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{visitsCount} visits</span>
                            {lastVisit && (
                              <span className="ml-2">· Last visit: {new Date(lastVisit).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {points} points
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            1000 for free service
                          </span>
                        </div>
                        <ProgressBar 
                          value={points} 
                          max={1000} 
                          color="bg-purple-500" 
                          animate
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
                          <span className="text-purple-600 font-medium">{1000 - points} more points</span> until your next reward
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          rightIcon={<ChevronRight size={16} />}
                          onClick={() => navigate('/check-in')}
                        >
                          Check In
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      )}
      
      {/* Visit History Content */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Visits</h2>
            </CardHeader>
            <CardBody className="p-0">
              {recentVisits.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">No visits recorded yet.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recentVisits.map(visit => {
                    const business = businesses.find(b => b.id === visit.businessId);
                    return (
                      <li key={visit.id} className="p-6">
                        <div className="flex items-start md:items-center justify-between flex-col md:flex-row">
                          <div className="flex items-start mb-3 md:mb-0">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Store size={20} className="text-gray-700" />
                            </div>
                            <div className="ml-4">
                              <p className="font-medium text-gray-900">{business?.name || 'Unknown Business'}</p>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Calendar size={14} className="mr-1" />
                                <span>{new Date(visit.date).toLocaleDateString()}</span>
                                <Clock size={14} className="ml-3 mr-1" />
                                <span>{new Date(visit.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>
                          <div className="md:text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              +{visit.points} points
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              {business ? <span>Balance: {getCustomerPoints(business.id)}</span> : null}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;