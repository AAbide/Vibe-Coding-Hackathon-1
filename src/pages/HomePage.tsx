import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Award, BarChart2, Smartphone, Store, Coffee, Scissors } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const HomePage: React.FC = () => {
  const { isLoggedIn, userType } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(searchParams.get('login') === 'true');
  const [showSignupModal, setShowSignupModal] = useState(searchParams.get('signup') === 'true');
  
  const handleGetStarted = () => {
    if (isLoggedIn) {
      if (userType === 'business') {
        navigate('/business');
      } else {
        navigate('/profile');
      }
    } else {
      setShowSignupModal(true);
    }
  };
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Loyalty rewards made simple for local businesses
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Build customer loyalty with a seamless rewards system that works for salons, barbershops, and local eateries.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-white text-purple-700 hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
                <Button 
                  as={Link}
                  to="/about"
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden transform rotate-2">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Store className="h-8 w-8 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Bella's Salon</h3>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Your Points</span>
                        <span className="text-sm font-bold text-purple-600">750</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">0</span>
                        <span className="text-xs text-gray-500">1000 for free service</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Visits</h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex justify-between">
                          <span>May 15, 2025</span>
                          <span className="font-medium text-purple-600">+100 pts</span>
                        </li>
                        <li className="text-sm text-gray-600 flex justify-between">
                          <span>May 1, 2025</span>
                          <span className="font-medium text-purple-600">+100 pts</span>
                        </li>
                        <li className="text-sm text-gray-600 flex justify-between">
                          <span>Apr 15, 2025</span>
                          <span className="font-medium text-purple-600">+100 pts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-xl overflow-hidden transform -rotate-3 w-64">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Coffee className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="text-sm font-semibold text-gray-900">Joe's Coffee</h3>
                    </div>
                    <div className="bg-amber-50 rounded-md p-2 mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">Visits</span>
                        <span className="text-xs font-bold text-amber-600">8/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-xl overflow-hidden transform rotate-6 w-56">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Scissors className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-sm font-semibold text-gray-900">Ted's Barber</h3>
                    </div>
                    <div className="bg-blue-50 rounded-md p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-700">Next reward</span>
                        <span className="text-xs font-bold text-blue-600">1 visit away!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, phone number-based loyalty system that works for your business and your customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-md transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6 mx-auto">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple Sign-Up</h3>
              <p className="text-gray-600 mb-4">
                Customers register with just their phone number. No apps to download or cards to carry.
              </p>
              <Button 
                as={Link}
                to="/signup"
                variant="outline" 
                fullWidth
              >
                Learn More
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-md transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-6 mx-auto">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Visits</h3>
              <p className="text-gray-600 mb-4">
                Effortlessly record customer visits and automatically add points to their account.
              </p>
              <Button 
                as={Link}
                to="/signup"
                variant="outline" 
                fullWidth
              >
                Learn More
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-md transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6 mx-auto">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reward Loyalty</h3>
              <p className="text-gray-600 mb-4">
                Create custom rewards that keep your customers coming back again and again.
              </p>
              <Button 
                as={Link}
                to="/signup"
                variant="outline" 
                fullWidth
              >
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Business Types Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect For Your Business</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you run a salon, barbershop, or local eatery, our loyalty system is designed with your needs in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-[url('https://images.pexels.com/photos/3992852/pexels-photo-3992852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Salons</h3>
                <p className="text-gray-600 mb-4">
                  Reward clients for regular appointments and product purchases. Track client preferences and history.
                </p>
                <Button 
                  as={Link}
                  to="/solutions/salons"
                  variant="outline" 
                  fullWidth
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-[url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Barbershops</h3>
                <p className="text-gray-600 mb-4">
                  Build a loyal clientele with visit-based rewards. Track customer preferences and schedule reminders.
                </p>
                <Button 
                  as={Link}
                  to="/solutions/barbershops"
                  variant="outline" 
                  fullWidth
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-[url('https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Eateries</h3>
                <p className="text-gray-600 mb-4">
                  Encourage repeat visits with points-based rewards. Promote special items and events to your loyal customers.
                </p>
                <Button 
                  as={Link}
                  to="/solutions/eateries"
                  variant="outline" 
                  fullWidth
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analytics Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Insights to Grow Your Business
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Understand your customers better with simple analytics that show you what's working.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">See which rewards drive the most repeat business</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Track customer visit frequency and spending patterns</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Identify your most loyal customers and personalize their experience</p>
                </li>
              </ul>
              <Button 
                as={Link}
                to="/analytics"
                className="mt-8"
              >
                Explore Analytics
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Growth</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Monthly</Button>
                    <Button variant="text" size="sm">Yearly</Button>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg flex items-end justify-between p-4">
                  <div className="w-8 bg-purple-500 rounded-t h-20"></div>
                  <div className="w-8 bg-purple-500 rounded-t h-28"></div>
                  <div className="w-8 bg-purple-500 rounded-t h-24"></div>
                  <div className="w-8 bg-purple-500 rounded-t h-36"></div>
                  <div className="w-8 bg-purple-500 rounded-t h-48"></div>
                  <div className="w-8 bg-purple-500 rounded-t h-40"></div>
                  <div className="w-8 bg-indigo-600 rounded-t h-52"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">New Customers</p>
                    <p className="text-2xl font-bold text-gray-900">+28%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Retention Rate</p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reward Redemptions</p>
                    <p className="text-2xl font-bold text-gray-900">124</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost customer loyalty?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of local businesses who are growing their customer base with our simple loyalty system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              as={Link}
              to="/signup"
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              Get Started Free
            </Button>
            <Button 
              as={Link}
              to="/demo"
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
      
      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onSignupClick={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }} />
      )}
      
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} onLoginClick={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }} />
      )}
    </div>
  );
};

export default HomePage;