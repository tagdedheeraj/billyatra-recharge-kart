
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Edit, Save, X, Gift, Star, Zap, History, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useToast } from '../ui/use-toast';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  totalRecharges: number;
  totalAmount: number;
  rewardsEarned: number;
  joinDate: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  mobile: string;
  operator: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: any;
  rewardEarned?: number;
}

const FirebaseProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useFirebaseAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    mobile: '',
    totalRecharges: 0,
    totalAmount: 0,
    rewardsEarned: 0,
    joinDate: ''
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/firebase-auth');
      return;
    }

    if (user) {
      loadUserProfile();
      loadTransactions();
    }
  }, [user, authLoading, navigate]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const profileRef = doc(db, 'users', user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        const data = profileSnap.data() as UserProfile;
        setUserProfile(data);
      } else {
        // Create initial profile
        const initialProfile: UserProfile = {
          name: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          mobile: '',
          totalRecharges: 0,
          totalAmount: 0,
          rewardsEarned: 0,
          joinDate: new Date().toISOString()
        };
        await setDoc(profileRef, initialProfile);
        setUserProfile(initialProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    }
  };

  const loadTransactions = async () => {
    if (!user) return;
    
    try {
      const transactionsRef = collection(db, 'transactions');
      const q = query(
        transactionsRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const transactionList: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        transactionList.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      
      setTransactions(transactionList);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const profileRef = doc(db, 'users', user.uid);
      await setDoc(profileRef, userProfile, { merge: true });
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default"
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    loadUserProfile();
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/firebase-dashboard" className="mr-4">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <p className="text-purple-100">
                    Member since {userProfile.joinDate ? new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                disabled={loading}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Personal Information</span>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700" disabled={loading}>
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
                    className="pl-10 h-12"
                    disabled
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
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5 text-purple-500" />
                <span>Recent Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.type}</p>
                          <p className="text-sm text-gray-600">{transaction.mobile} - {transaction.operator}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{transaction.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(transaction.timestamp)}
                        </span>
                        {transaction.rewardEarned && (
                          <span className="text-green-600">+₹{transaction.rewardEarned} reward</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No transactions yet</p>
                    <p className="text-sm text-gray-400">Your recharge history will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">Earn rewards with every recharge</p>
              <Link to="/offers">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  View Rewards
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
              <p className="text-gray-600 text-sm mb-4">Invite friends and earn together</p>
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

export default FirebaseProfilePage;
