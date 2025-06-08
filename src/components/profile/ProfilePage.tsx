
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '../ui/button';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileDetails from './ProfileDetails';
import ProfileActions from './ProfileActions';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    totalRecharges: 45,
    totalAmount: 12750,
    rewardsEarned: 850,
    joinDate: '2024-01-15'
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load user data from localStorage
    const name = localStorage.getItem('userName') || 'User';
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    const mobile = localStorage.getItem('userMobile') || '+91 9876543210';

    setUserProfile(prev => ({
      ...prev,
      name: name.split('@')[0],
      email,
      mobile
    }));
  }, [navigate]);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userName', userProfile.name);
    localStorage.setItem('userEmail', userProfile.email);
    localStorage.setItem('userMobile', userProfile.mobile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    const name = localStorage.getItem('userName') || 'User';
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    const mobile = localStorage.getItem('userMobile') || '+91 9876543210';

    setUserProfile(prev => ({
      ...prev,
      name: name.split('@')[0],
      email,
      mobile
    }));
    setIsEditing(false);
  };

  const handleUserProfileChange = (updates: Partial<typeof userProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 pb-20 sm:pb-0">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Profile
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader 
          userProfile={userProfile}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
        />

        <ProfileStats userProfile={userProfile} />

        <ProfileDetails
          userProfile={userProfile}
          isEditing={isEditing}
          onUserProfileChange={handleUserProfileChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <ProfileActions />
      </div>
    </div>
  );
};

export default ProfilePage;
