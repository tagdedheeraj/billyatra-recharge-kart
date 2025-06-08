
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './notifications/NotificationBell';

interface MobileHeaderProps {
  user: any;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logOut } = useFirebaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Dashboard', href: '/firebase-dashboard' },
    { label: 'Mobile Recharge', href: '/firebase-recharge' },
    { label: 'Offers & Deals', href: '/offers' },
    { label: 'Refer & Earn', href: '/referrals' },
    { label: 'Coupons', href: '/coupons' },
    { label: 'Profile', href: '/firebase-profile' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userName = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <header className="bg-white shadow-lg border-b border-orange-100 sticky top-0 z-50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/firebase-dashboard" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2.5 rounded-xl shadow-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Billyatra
              </span>
              <div className="text-xs text-gray-500 font-medium">Mobile Recharge</div>
            </div>
          </Link>
          
          {/* Right side - User Avatar, Notifications & Menu */}
          <div className="flex items-center space-x-3">
            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 border-2 border-orange-200">
                <AvatarImage src={user.photoURL} alt={userName} />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
              </div>
            </div>

            {/* Notifications */}
            <NotificationBell />
            
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-50">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-orange-50 to-pink-50">
                <SheetHeader className="border-b border-orange-200 pb-6 mb-6">
                  <SheetTitle className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-orange-300">
                      <AvatarImage src={user.photoURL} alt={userName} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-bold text-gray-900 text-lg">{userName}</p>
                      <p className="text-sm text-orange-600 font-medium">Welcome back!</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Menu Items */}
                <div className="space-y-3">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-4 text-gray-700 hover:bg-white hover:text-orange-600 hover:shadow-md rounded-xl transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <hr className="my-6 border-orange-200" />
                  
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start px-4 py-4 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-medium"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
