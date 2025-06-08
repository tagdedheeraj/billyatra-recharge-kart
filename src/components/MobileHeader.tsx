
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
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - More compact */}
          <Link to="/firebase-dashboard" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg shadow-sm">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Billyatra
            </span>
          </Link>
          
          {/* Right side - Minimal design */}
          <div className="flex items-center space-x-2">
            {/* User Avatar - Smaller */}
            <Avatar className="h-7 w-7 border border-orange-200">
              <AvatarImage src={user.photoURL} alt={userName} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>

            {/* Notifications - Smaller */}
            <NotificationBell />
            
            {/* Mobile Menu - Cleaner button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1.5 hover:bg-orange-50 rounded-lg">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white border-l border-gray-100">
                <SheetHeader className="border-b border-gray-100 pb-4 mb-4">
                  <SheetTitle className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-orange-200">
                      <AvatarImage src={user.photoURL} alt={userName} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{userName}</p>
                      <p className="text-sm text-orange-600">Welcome back!</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Menu Items - Cleaner design */}
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors duration-150 font-medium text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <hr className="my-4 border-gray-100" />
                  
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium text-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
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
