
import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star, Clock, Zap, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  maxCashback: string;
  validTill: string;
  code: string;
  type: string;
  minAmount: string;
  gradient: string;
}

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cashback': return Gift;
      case 'weekend': return Star;
      case 'bonus': return Zap;
      case 'daily': return Clock;
      case 'loyalty': return Star;
      case 'festival': return Gift;
      default: return Gift;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cashback': return 'bg-green-100 text-green-800';
      case 'weekend': return 'bg-purple-100 text-purple-800';
      case 'bonus': return 'bg-orange-100 text-orange-800';
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'loyalty': return 'bg-pink-100 text-pink-800';
      case 'festival': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const IconComponent = getTypeIcon(offer.type);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group">
      <div className={`bg-gradient-to-r ${offer.gradient} p-4 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <IconComponent className="h-6 w-6" />
          <Badge className={getTypeColor(offer.type)}>
            {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
        <div className="text-2xl font-bold">{offer.discount}</div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Max Cashback:</span>
            <span className="font-semibold text-green-600">{offer.maxCashback}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Min Amount:</span>
            <span className="font-semibold">{offer.minAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valid Till:</span>
            <span className="font-semibold text-orange-600">{offer.validTill}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Promo Code:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(offer.code)}
              className="h-6 text-xs"
            >
              {offer.code}
            </Button>
          </div>
        </div>
        
        <Link to="/recharge">
          <Button className={`w-full bg-gradient-to-r ${offer.gradient} hover:opacity-90`}>
            <Smartphone className="h-4 w-4 mr-2" />
            Use Offer
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
