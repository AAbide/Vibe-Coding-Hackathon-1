import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle, XCircle, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useCustomer } from '../contexts/CustomerContext';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CheckInPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { businesses } = useBusiness();
  const { recordVisit } = useCustomer();
  
  const [checkinSuccess, setCheckinSuccess] = useState<boolean | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkinMethod, setCheckinMethod] = useState<'qr' | 'phone'>('qr');
  
  // Redirect if not a customer user
  useEffect(() => {
    if (user && user.type !== 'customer') {
      navigate('/');
    }
    
    // Set user's phone number if available
    if (user && user.phone) {
      setPhoneNumber(user.phone);
    }
  }, [user, navigate]);
  
  const handleCheckin = async () => {
    try {
      if (!user) throw new Error('Not logged in');
      
      if (checkinMethod === 'phone') {
        if (!selectedBusiness) throw new Error('Please select a business');
        
        // In a real app, this would communicate with the server
        await recordVisit(selectedBusiness, 100);
        setCheckinSuccess(true);
      } else {
        // Simulate QR code scanning success
        // In a real app, this would be handled by a QR scanner
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Randomly select a business for demo purposes
        const randomBusiness = businesses[Math.floor(Math.random() * businesses.length)];
        if (randomBusiness) {
          await recordVisit(randomBusiness.id, 100);
          setSelectedBusiness(randomBusiness.id);
          setCheckinSuccess(true);
        }
      }
    } catch (error) {
      console.error('Check-in failed:', error);
      setCheckinSuccess(false);
    }
  };
  
  const resetCheckin = () => {
    setCheckinSuccess(null);
    setSelectedBusiness('');
  };
  
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-8">Please log in to check in at businesses.</p>
          <Button onClick={() => navigate('/?login=true')}>Log In</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Check In</h1>
        <p className="text-gray-600">
          Check in at a business to earn points toward rewards.
        </p>
      </div>
      
      {checkinSuccess === null ? (
        <Card>
          <CardHeader className="flex justify-between items-center border-b">
            <div className="flex w-full">
              <button
                className={`flex-1 py-2 text-center font-medium text-sm ${
                  checkinMethod === 'qr'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setCheckinMethod('qr')}
              >
                QR Code
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium text-sm ${
                  checkinMethod === 'phone'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setCheckinMethod('phone')}
              >
                Phone Number
              </button>
            </div>
          </CardHeader>
          <CardBody>
            {checkinMethod === 'qr' ? (
              <div className="text-center p-4">
                <div className="mb-6 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                  <QrCode size={180} className="text-gray-900" />
                </div>
                <p className="text-gray-600 mb-6">
                  Show this QR code to the business to check in and earn points.
                </p>
                <Button onClick={handleCheckin}>
                  Simulate Scan (Demo)
                </Button>
              </div>
            ) : (
              <div className="p-4">
                <div className="mb-6">
                  <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Business
                  </label>
                  <select
                    id="business"
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  >
                    <option value="">Select a business</option>
                    {businesses.map((business) => (
                      <option key={business.id} value={business.id}>
                        {business.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <Input
                    label="Your Phone Number"
                    type="tel"
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    leftIcon={<Phone size={16} />}
                    fullWidth
                  />
                </div>
                <Button 
                  onClick={handleCheckin} 
                  fullWidth 
                  disabled={!selectedBusiness || !phoneNumber}
                >
                  Check In
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="p-8 text-center">
            {checkinSuccess ? (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Check-In Successful!
                </h2>
                <p className="text-gray-600 mb-1">
                  You've earned 100 points at {businesses.find(b => b.id === selectedBusiness)?.name || 'the business'}.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Keep visiting to earn more rewards!
                </p>
                <div className="flex flex-col space-y-3">
                  <Button onClick={() => navigate('/profile')}>
                    View My Profile
                  </Button>
                  <Button variant="outline" onClick={resetCheckin}>
                    Check In Again
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                  <XCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Check-In Failed
                </h2>
                <p className="text-gray-600 mb-6">
                  There was a problem with your check-in. Please try again.
                </p>
                <Button onClick={resetCheckin}>
                  Try Again
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      )}
      
      <div className="mt-8 bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-purple-900 mb-2">Recent Check-ins</h3>
        <p className="text-sm text-purple-700 mb-4">
          Your last 3 check-ins will appear here.
        </p>
        <ul className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="bg-white rounded-md p-3 shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  {businesses[index % businesses.length]?.name || 'Business Name'}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm font-medium text-green-600">+100 pts</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Button 
            variant="text" 
            size="sm" 
            rightIcon={<ArrowRight size={16} />} 
            onClick={() => navigate('/profile?tab=history')}
          >
            View All Check-ins
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInPage;