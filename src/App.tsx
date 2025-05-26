import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BusinessProvider } from './contexts/BusinessContext';
import { CustomerProvider } from './contexts/CustomerContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BusinessDashboard from './pages/BusinessDashboard';
import CustomerProfile from './pages/CustomerProfile';
import CheckInPage from './pages/CheckInPage';
import RewardsPage from './pages/RewardsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BusinessProvider>
          <CustomerProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/business" element={<BusinessDashboard />} />
                <Route path="/profile" element={<CustomerProfile />} />
                <Route path="/check-in" element={<CheckInPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/analytics" element={<BusinessDashboard />} />
                <Route path="/solutions/salons" element={<HomePage />} />
                <Route path="/solutions/barbershops" element={<HomePage />} />
                <Route path="/solutions/eateries" element={<HomePage />} />
                <Route path="/demo" element={<HomePage />} />
                <Route path="/signup" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </CustomerProvider>
        </BusinessProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;