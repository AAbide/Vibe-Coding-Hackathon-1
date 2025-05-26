import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, Users, Award, DollarSign, TrendingUp, Calendar, 
  Search, ArrowUpRight, Phone, User, MapPin, ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useCustomer } from '../contexts/CustomerContext';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import CustomerVisitModal from '../components/business/CustomerVisitModal';
import { Visit } from '../types';

const BusinessDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedBusiness, businesses } = useBusiness();
  const { visits, getBusinessVisits } = useCustomer();
  
  const [searchPhone, setSearchPhone] = useState('');
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: string; name: string; phone: string } | null>(null);
  
  // Redirect if not a business user
  React.useEffect(() => {
    if (user && user.type !== 'business') {
      navigate('/');
    }
  }, [user, navigate]);
  
  const business = selectedBusiness || (businesses.length > 0 ? businesses[0] : null);
  
  const businessVisits = business ? getBusinessVisits(business.id) : [];
  
  // Last 7 days of visits
  const last7DaysVisits = businessVisits.filter(visit => {
    const visitDate = new Date(visit.date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return visitDate >= sevenDaysAgo;
  });
  
  // Group by day
  const visitsByDay = last7DaysVisits.reduce<Record<string, number>>((acc, visit) => {
    const day = new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  
  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();
  
  // Normalize data for chart
  const chartData = last7Days.map(day => visitsByDay[day] || 0);
  
  // Unique customers in the last 30 days
  const last30DaysVisits = businessVisits.filter(visit => {
    const visitDate = new Date(visit.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return visitDate >= thirtyDaysAgo;
  });
  
  const uniqueCustomers = new Set(last30DaysVisits.map(visit => visit.customerId)).size;
  
  // Recent visits
  const recentVisits = [...businessVisits]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const handleSearch = () => {
    // Mock search functionality
    if (searchPhone) {
      // In a real app, this would search the database
      setSelectedCustomer({
        id: 'customer123',
        name: 'Jane Smith',
        phone: searchPhone
      });
      setShowVisitModal(true);
    }
  };
  
  if (!business) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Business Found</h2>
          <p className="text-gray-600 mb-8">You don't have a business set up yet.</p>
          <Button>Create Your Business</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{business.name} Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<Calendar size={16} />}
          >
            Last 30 Days <ChevronDown size={16} className="ml-1" />
          </Button>
          <Button 
            onClick={() => navigate('/rewards')}
            leftIcon={<Award size={16} />}
          >
            Manage Rewards
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {new Set(businessVisits.map(visit => visit.customerId)).size}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">12% increase</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Visits</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {last30DaysVisits.length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">8% increase</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reward Redemptions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Award size={20} className="text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">18% increase</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customer Retention</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">84%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowUpRight size={20} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">2% increase</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Search & Record Visit */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Record a Visit</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 mb-4">Enter a customer's phone number to record their visit.</p>
            <div className="flex mb-4">
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                leftIcon={<Phone size={16} />}
                fullWidth
                className="mr-2"
              />
              <Button onClick={handleSearch}>
                <Search size={16} />
              </Button>
            </div>
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Not Found?</h3>
              <p className="text-sm text-gray-600 mb-3">
                If this is a new customer, you can quickly add them to your system.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Register New Customer
              </Button>
            </div>
          </CardBody>
        </Card>
        
        {/* Weekly Visits Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Visits</h2>
            <Button variant="text" size="sm">
              View Full Report
            </Button>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-end space-x-6 px-4">
              {last7Days.map((day, index) => (
                <div key={day} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-100 rounded-t flex-1" style={{ height: '80%' }}>
                    <div 
                      className="bg-purple-500 rounded-t w-full transition-all duration-500 ease-out"
                      style={{ 
                        height: `${chartData[index] ? (chartData[index] / Math.max(...chartData)) * 100 : 0}%`,
                        minHeight: chartData[index] ? '10%' : '0' 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 mt-2">{day}</span>
                  <span className="text-sm font-bold text-gray-900">{chartData[index] || 0}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Visits */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Visits</h2>
            <Button variant="text" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentVisits.map((visit: Visit) => (
                    <tr key={visit.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Customer #{visit.customerId.substring(0, 5)}
                            </div>
                            <div className="text-sm text-gray-500">555-xxx-xxxx</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(visit.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(visit.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          +{visit.points} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="text" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        
        {/* Top Customers */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Top Customers</h2>
            <Button variant="text" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardBody className="px-0 py-2">
            <ul className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Customer #{index + 1}</p>
                        <div className="flex items-center">
                          <Phone size={12} className="text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">555-xxx-xxxx</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{10 - index} visits</p>
                      <p className="text-xs text-gray-500">Last: {index + 1} days ago</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
      
      {/* Customer Visit Modal */}
      {showVisitModal && selectedCustomer && (
        <CustomerVisitModal 
          customer={selectedCustomer} 
          business={business}
          onClose={() => setShowVisitModal(false)} 
        />
      )}
    </div>
  );
};

export default BusinessDashboard;