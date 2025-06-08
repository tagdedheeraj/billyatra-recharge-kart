
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import Dashboard from '../components/Dashboard';
import RechargePage from '../components/recharge/RechargePage';
import OffersPage from '../components/offers/OffersPage';
import CouponsPage from '../components/coupons/CouponsPage';
import BookingPage from '../components/booking/BookingPage';
import ProfilePage from '../components/profile/ProfilePage';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default Index;
