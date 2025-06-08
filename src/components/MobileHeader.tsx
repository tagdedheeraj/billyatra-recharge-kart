
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
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

  return (
    <header className="bg-white shadow-lg border-b border-orange-100 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/firebase-dashboard" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Billyatra
            </span>
          </Link>
          
          {/* Right side - Mobile */}
          <div className="flex items-center space-x-2">
            <NotificationBell />
            
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="border-b pb-4 mb-4">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        {user.displayName || user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Menu Items */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <hr className="my-4" />
                  
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
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
