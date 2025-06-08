
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Smartphone, Gift, User, Ticket, Menu } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const BottomBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show bottom bar on desktop or on landing page
  if (!isMobile || location.pathname === '/') {
    return null;
  }

  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/dashboard',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Smartphone,
      label: 'Recharge',
      path: '/recharge',
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      icon: Gift,
      label: 'Offers',
      path: '/offers',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Ticket,
      label: 'Coupons',
      path: '/coupons',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg backdrop-blur-md bg-white/95">
      <div className="flex items-center justify-around py-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 group"
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center mb-1 transition-all duration-300
                ${isActive 
                  ? `bg-gradient-to-r ${item.gradient} shadow-lg scale-110` 
                  : 'bg-gray-100 group-hover:bg-gray-200'
                }
              `}>
                <IconComponent 
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`} 
                />
              </div>
              <span className={`
                text-xs font-medium transition-colors duration-300 truncate
                ${isActive 
                  ? 'text-orange-600' 
                  : 'text-gray-500 group-hover:text-gray-700'
                }
              `}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
