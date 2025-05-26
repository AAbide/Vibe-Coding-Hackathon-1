import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SignupModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onLoginClick }) => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'business'>('customer');
  const [passwordError, setPasswordError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    
    try {
      await register(name, email, password, userType, userType === 'customer' ? phone : undefined);
      onClose();
      navigate(userType === 'business' ? '/business' : '/profile');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Sign Up</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex w-full rounded-md overflow-hidden border border-gray-300">
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium text-sm ${
                  userType === 'customer'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setUserType('customer')}
              >
                I'm a Customer
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium text-sm ${
                  userType === 'business'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setUserType('business')}
              >
                I'm a Business
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <Input
              label={userType === 'business' ? 'Business Name' : 'Full Name'}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userType === 'business' ? 'Your Business Name' : 'Your Name'}
              leftIcon={userType === 'business' ? <Store size={16} /> : <User size={16} />}
              required
              fullWidth
            />
          </div>
          
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              leftIcon={<Mail size={16} />}
              required
              fullWidth
            />
          </div>
          
          {userType === 'customer' && (
            <div className="mb-4">
              <Input
                label="Phone Number"
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                leftIcon={<Phone size={16} />}
                required
                fullWidth
              />
            </div>
          )}
          
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              required
              fullWidth
            />
          </div>
          
          <div className="mb-6">
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              error={passwordError}
              required
              fullWidth
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                </label>
              </div>
            </div>
          </div>
          
          <Button type="submit" fullWidth isLoading={loading}>
            Create Account
          </Button>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="font-medium text-purple-600 hover:text-purple-500"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;