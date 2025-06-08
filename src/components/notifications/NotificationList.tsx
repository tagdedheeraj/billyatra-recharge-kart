
import React from 'react';
import { Bell, Gift, Smartphone, AlertCircle, ExternalLink, Check, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { useNotifications } from '../../contexts/NotificationContext';
import { Notification } from '../../types/notifications';

const NotificationList: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'offer':
        return Gift;
      case 'transaction':
        return Smartphone;
      case 'promotional':
        return Gift;
      case 'system':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'transaction':
        return 'bg-blue-100 text-blue-800';
      case 'promotional':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-h-96">
      <div className="flex justify-between items-center p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-700"
        >
          <Check className="h-4 w-4 mr-1" />
          Mark all read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear all
        </Button>
      </div>
      
      <ScrollArea className="h-80">
        <div className="p-2">
          {notifications.map((notification) => {
            const IconComponent = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-3 mb-2 rounded-lg border transition-colors ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      notification.read ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {notification.timestamp.toLocaleDateString()}
                      </span>
                      
                      <div className="flex space-x-2">
                        {notification.actionUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700"
                            onClick={() => window.open(notification.actionUrl, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {notification.actionText || 'View'}
                          </Button>
                        )}
                        
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationList;
