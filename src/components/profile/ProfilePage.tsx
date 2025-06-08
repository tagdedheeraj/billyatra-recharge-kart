
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Edit, Save, X, Gift, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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

  const stats = [
    {
      title: 'Total Recharges',
      value: userProfile.totalRecharges,
      icon: Zap,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Amount Spent',
      value: `₹${userProfile.totalAmount.toLocaleString()}`,
      icon: Star,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Rewards Earned',
      value: `₹${userProfile.rewardsEarned}`,
      icon: Gift,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

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
        {/* Profile Header */}
        <Card className="mb-8 shadow-xl border-0 bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  <p className="text-purple-100">Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center shadow-lg border-0">
                <CardContent className="p-6">
                  <div className={`${stat.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Profile Details */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Personal Information</span>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="pl-10 h-12"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="pl-10 h-12"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={userProfile.mobile}
                    onChange={(e) => setUserProfile({...userProfile, mobile: e.target.value})}
                    className="pl-10 h-12"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Member Since
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                      day: 'numeric',
                      month: 'long', 
                      year: 'numeric' 
                    })}
                    className="h-12"
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loyalty Program</h3>
              <p className="text-gray-600 text-sm mb-4">You're a valued member with special benefits</p>
              <Link to="/offers">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  View Benefits
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
              <p className="text-gray-600 text-sm mb-4">Invite friends and earn rewards together</p>
              <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                Refer Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
