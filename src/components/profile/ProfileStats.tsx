
import React from 'react';
import { Gift, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface ProfileStatsProps {
  userProfile: {
    totalRecharges: number;
    totalAmount: number;
    rewardsEarned: number;
  };
}

const ProfileStats = ({ userProfile }: ProfileStatsProps) => {
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
  );
};

export default ProfileStats;
