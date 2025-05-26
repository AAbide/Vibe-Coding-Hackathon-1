import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Phone, Mail } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Logo className="text-white" />
              <span className="ml-2 text-xl font-semibold">LocalRewards</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Building community through loyalty, one reward at a time.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://facebook.com/AbidemiAde" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/LoyaltyRewards5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <a href="tel:+2348028362345">+234 802 836 2345</a>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <a href="mailto:loyaltyrewards25@gmail.com">loyaltyrewards25@gmail.com</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">For Businesses</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/business" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Manage Rewards
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Customer Analytics
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">For Customers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/check-in" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Check In
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-400 hover:text-white transition-colors duration-200">
                  My Rewards
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Find Businesses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} LocalRewards. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Made with ❤️ for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;