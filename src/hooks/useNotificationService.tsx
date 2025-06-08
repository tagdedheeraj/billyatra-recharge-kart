
import { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { useFirebaseAuth } from './useFirebaseAuth';

export const useNotificationService = () => {
  const { addNotification } = useNotifications();
  const { user } = useFirebaseAuth();

  // Simulate real-time notifications (in a real app, this would connect to a backend service)
  useEffect(() => {
    if (!user) return;

    // Simulate periodic promotional notifications
    const promotionalInterval = setInterval(() => {
      const promotionalMessages = [
        {
          title: "🎉 Special Offer!",
          message: "Get 20% extra cashback on your next recharge. Limited time offer!",
          type: 'offer' as const,
          priority: 'medium' as const,
          actionUrl: '/offers',
          actionText: 'View Offers'
        },
        {
          title: "💰 Referral Bonus",
          message: "Invite 3 friends and earn ₹150 bonus. Start sharing your referral code!",
          type: 'promotional' as const,
          priority: 'low' as const,
          actionUrl: '/referrals',
          actionText: 'Refer Now'
        },
        {
          title: "🎁 Daily Rewards",
          message: "Don't forget to check your daily scratch cards for exciting prizes!",
          type: 'promotional' as const,
          priority: 'low' as const,
          actionUrl: '/firebase-recharge',
          actionText: 'Play Now'
        }
      ];

      const randomMessage = promotionalMessages[Math.floor(Math.random() * promotionalMessages.length)];
      
      // Only add if it's been a while since last promotional notification
      const lastPromo = localStorage.getItem('lastPromoNotification');
      const now = Date.now();
      if (!lastPromo || now - parseInt(lastPromo) > 30 * 60 * 1000) { // 30 minutes
        addNotification(randomMessage);
        localStorage.setItem('lastPromoNotification', now.toString());
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(promotionalInterval);
  }, [user, addNotification]);

  // Function to send transaction notifications
  const notifyTransaction = (type: 'success' | 'failed' | 'pending', amount: number, mobile: string) => {
    const messages = {
      success: {
        title: "✅ Recharge Successful",
        message: `Your recharge of ₹${amount} for ${mobile} has been completed successfully.`,
        priority: 'high' as const
      },
      failed: {
        title: "❌ Recharge Failed",
        message: `Your recharge of ₹${amount} for ${mobile} could not be processed. Please try again.`,
        priority: 'high' as const
      },
      pending: {
        title: "⏳ Recharge Processing",
        message: `Your recharge of ₹${amount} for ${mobile} is being processed. You'll be notified once completed.`,
        priority: 'medium' as const
      }
    };

    addNotification({
      ...messages[type],
      type: 'transaction',
      actionUrl: '/firebase-dashboard',
      actionText: 'View Details'
    });
  };

  // Function to send offer notifications
  const notifyOffer = (title: string, message: string, actionUrl?: string) => {
    addNotification({
      title,
      message,
      type: 'offer',
      priority: 'medium',
      actionUrl,
      actionText: 'View Offer'
    });
  };

  // Function to send system notifications
  const notifySystem = (title: string, message: string, priority: 'low' | 'medium' | 'high' = 'low') => {
    addNotification({
      title,
      message,
      type: 'system',
      priority
    });
  };

  return {
    notifyTransaction,
    notifyOffer,
    notifySystem
  };
};
