
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Clock, Zap, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: '50% Cashback on First Recharge',
      description: 'Get 50% cashback up to ₹100 on your first mobile recharge',
      discount: '50%',
      maxCashback: '₹100',
      validTill: '31 Dec 2024',
      code: 'FIRST50',
      type: 'cashback',
      minAmount: '₹200',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      title: 'Weekend Special - Extra 25% Off',
      description: 'Recharge on weekends and get extra 25% cashback',
      discount: '25%',
      maxCashback: '₹75',
      validTill: 'Every Weekend',
      code: 'WEEKEND25',
      type: 'weekend',
      minAmount: '₹150',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      id: 3,
      title: 'Bulk Recharge Bonus',
      description: 'Recharge above ₹500 and get instant ₹50 bonus',
      discount: '₹50',
      maxCashback: '₹50',
      validTill: '25 Dec 2024',
      code: 'BULK50',
      type: 'bonus',
      minAmount: '₹500',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Daily Surprise Cashback',
      description: 'Random cashback between ₹10-₹100 on every recharge',
      discount: 'Up to ₹100',
      maxCashback: '₹100',
      validTill: 'Daily',
      code: 'SURPRISE',
      type: 'daily',
      minAmount: '₹100',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 5,
      title: 'Loyalty Rewards Program',
      description: 'Complete 5 recharges in a month and get ₹200 bonus',
      discount: '₹200',
      maxCashback: '₹200',
      validTill: 'Monthly',
      code: 'LOYAL200',
      type: 'loyalty',
      minAmount: '₹100',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      title: 'Festival Mega Offer',
      description: 'Special festival offer with triple cashback rewards',
      discount: '3x Cashback',
      maxCashback: '₹300',
      validTill: '15 Jan 2025',
      code: 'FESTIVAL3X',
      type: 'festival',
      minAmount: '₹200',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Offers & Deals
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Offers Just for You! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Save more with our amazing cashback deals and special offers
          </p>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 inline-block">
            <p className="font-semibold">🔥 Limited Time: Extra 20% off on all offers!</p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {offers.map((offer) => {
            const IconComponent = getTypeIcon(offer.type);
            return (
              <Card key={offer.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group">
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
          })}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-xl text-orange-100 mb-6">
              These exclusive offers are available for a limited time only
            </p>
            <Link to="/recharge">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Start Recharging Now
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OffersPage;
