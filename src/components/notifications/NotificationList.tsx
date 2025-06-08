
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Gift, CreditCard, Megaphone, Info, ExternalLink, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useNotifications } from '../../contexts/NotificationContext';
import { Notification } from '../../types/notifications';

const NotificationList: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'offer':
        return <Gift className="h-4 w-4 text-green-500" />;
      case 'transaction':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'promotional':
        return <Megaphone className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-h-96">
      <div className="p-3 border-b flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={notifications.every(n => n.read)}
        >
          Mark all read
        </Button>
        <Button variant="ghost" size="sm" onClick={clearAll}>
          Clear all
        </Button>
      </div>
      
      <ScrollArea className="h-80">
        <div className="space-y-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50 border-l-blue-500' : 'border-l-gray-200'
              } ${getPriorityColor(notification.priority)}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                      {notification.actionUrl && (
                        <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {notification.actionText || 'View'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationList;
