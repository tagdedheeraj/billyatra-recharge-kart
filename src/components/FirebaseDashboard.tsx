import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Gift, Plane, Bus, Train, User, LogOut, Zap, Star, Ticket, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useToast } from './ui/use-toast';
import { useNotificationService } from '../hooks/useNotificationService';
import { useIsMobile } from '../hooks/use-mobile';
import NotificationBell from './notifications/NotificationBell';
import MobileHeader from './MobileHeader';

const FirebaseDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, logOut } = useFirebaseAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Initialize notification service
  useNotificationService();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/firebase-auth');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    const { error } = await logOut();
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail'); 
      localStorage.removeItem('userName');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  };

  if (!user) {
    return null;
  }

  const services = [
    {
      title: 'Mobile Recharge',
      icon: Smartphone,
      description: 'Quick & instant recharge for all networks',
      link: '/firebase-recharge',
      gradient: 'from-orange-500 to-pink-500',
      available: true
    },
    {
      title: 'Refer & Earn',
      icon: Users,
      description: 'Invite friends and earn ₹50 for each referral',
      link: '/referrals',
      gradient: 'from-purple-500 to-blue-500',
      available: true
    },
    {
      title: 'Offers & Deals',
      icon: Gift,
      description: 'Exclusive offers and cashback deals',
      link: '/offers',
      gradient: 'from-green-500 to-teal-500',
      available: true
    },
    {
      title: 'Bus Booking',
      icon: Bus,
      description: 'Book bus tickets across India',
      link: '/booking',
      gradient: 'from-blue-500 to-purple-500',
      available: false
    },
    {
      title: 'Train Booking',
      icon: Train,
      description: 'Book train tickets instantly',
      link: '/booking',
      gradient: 'from-indigo-500 to-purple-500',
      available: false
    },
    {
      title: 'Flight Booking',
      icon: Plane,
      description: 'Domestic & international flights',
      link: '/booking',
      gradient: 'from-purple-500 to-pink-500',
      available: false
    },
    {
      title: 'Coupons',
      icon: Ticket,
      description: 'Special discount coupons',
      link: '/coupons',
      gradient: 'from-yellow-500 to-orange-500',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header - Mobile or Desktop */}
      {isMobile ? (
        <MobileHeader user={user} />
      ) : (
        <header className="bg-white shadow-lg border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2.5 rounded-xl shadow-lg">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Billyatra
                  </span>
                  <div className="text-xs text-gray-500 font-medium">Mobile Recharge Platform</div>
                </div>
              </Link>
              
              <div className="flex items-center space-x-6">
                <NotificationBell />
                <Link to="/firebase-profile">
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-semibold">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${isMobile ? 'py-4' : 'py-8'}`}>
        {/* Welcome Section */}
        <div className={`mb-6 ${isMobile ? 'mb-4' : 'mb-8'}`}>
          <h1 className={`font-bold text-gray-900 mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Welcome back, {user.displayName || user.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600">Ready for your next recharge or booking?</p>
        </div>

        {/* Quick Actions */}
        <div className={`grid gap-4 mb-6 ${isMobile ? 'grid-cols-1 gap-3 mb-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'}`}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group">
                <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                      <IconComponent className={`text-white ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                    </div>
                    {!service.available && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className={`font-semibold text-gray-900 mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>{service.title}</h3>
                  <p className={`text-gray-600 mb-4 ${isMobile ? 'text-xs' : 'text-sm'}`}>{service.description}</p>
                  <Link to={service.link}>
                    <Button 
                      className={`w-full ${service.available ? `bg-gradient-to-r ${service.gradient} hover:opacity-90` : 'bg-gray-300 cursor-not-allowed'} ${isMobile ? 'text-sm py-2' : ''}`}
                      disabled={!service.available}
                      size={isMobile ? 'sm' : 'default'}
                    >
                      {service.available ? 'Get Started' : 'Coming Soon'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className={`shadow-lg border-0 ${isMobile ? 'mb-4' : 'mb-8'}`}>
          <CardHeader className={isMobile ? 'p-4 pb-2' : ''}>
            <CardTitle className="flex items-center space-x-2">
              <Zap className={`text-orange-500 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              <span className={isMobile ? 'text-base' : ''}>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-4 pt-2' : ''}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className={`bg-green-500 rounded-full flex items-center justify-center ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
                    <Smartphone className={`text-white ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  </div>
                  <div>
                    <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>Mobile Recharge</p>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>₹299 - Jio Prepaid</p>
                  </div>
                </div>
                <span className={`text-green-600 font-semibold ${isMobile ? 'text-sm' : ''}`}>Success</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className={`bg-blue-500 rounded-full flex items-center justify-center ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
                    <Gift className={`text-white ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  </div>
                  <div>
                    <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>Scratch Card Won</p>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>₹50 Cashback</p>
                  </div>
                </div>
                <span className={`text-blue-600 font-semibold ${isMobile ? 'text-sm' : ''}`}>Claimed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Highlight */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-6'}`}>
          <Card className="text-center bg-gradient-to-br from-orange-500 to-pink-500 text-white border-0 shadow-lg">
            <CardContent className={isMobile ? 'p-4' : 'p-6'}>
              <Zap className={`mx-auto mb-4 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`} />
              <h3 className={`font-bold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>Instant Recharge</h3>
              <p className={`text-orange-100 ${isMobile ? 'text-sm' : ''}`}>Lightning fast mobile recharge in seconds</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-green-500 to-teal-500 text-white border-0 shadow-lg">
            <CardContent className={isMobile ? 'p-4' : 'p-6'}>
              <Gift className={`mx-auto mb-4 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`} />
              <h3 className={`font-bold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>Win Rewards</h3>
              <p className={`text-green-100 ${isMobile ? 'text-sm' : ''}`}>Scratch cards and exciting prizes await</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-blue-500 to-purple-500 text-white border-0 shadow-lg">
            <CardContent className={isMobile ? 'p-4' : 'p-6'}>
              <Star className={`mx-auto mb-4 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`} />
              <h3 className={`font-bold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>Exclusive Offers</h3>
              <p className={`text-blue-100 ${isMobile ? 'text-sm' : ''}`}>Special deals and cashback offers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDashboard;
