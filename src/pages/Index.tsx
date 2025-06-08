
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import FirebaseLoginPage from '../components/auth/FirebaseLoginPage';
import Dashboard from '../components/Dashboard';
import FirebaseDashboard from '../components/FirebaseDashboard';
import RechargePage from '../components/recharge/RechargePage';
import FirebaseRechargePage from '../components/recharge/FirebaseRechargePage';
import OffersPage from '../components/offers/OffersPage';
import CouponsPage from '../components/coupons/CouponsPage';
import BookingPage from '../components/booking/BookingPage';
import ProfilePage from '../components/profile/ProfilePage';
import FirebaseProfilePage from '../components/profile/FirebaseProfilePage';
import ReferralPage from '../components/referral/ReferralPage';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/firebase-auth" element={<FirebaseLoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/firebase-dashboard" element={<FirebaseDashboard />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/firebase-recharge" element={<FirebaseRechargePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/firebase-profile" element={<FirebaseProfilePage />} />
        <Route path="/referrals" element={<ReferralPage />} />
      </Routes>
    </div>
  );
};

export default Index;
