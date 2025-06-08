
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket, Star, Clock, Gift, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const CouponsPage = () => {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const activeCoupons = [
    {
      id: 1,
      code: 'SAVE20',
      title: '₹20 Off on Recharge',
      description: 'Get ₹20 discount on recharge of ₹200 or more',
      discount: '₹20 OFF',
      minAmount: '₹200',
      validTill: '2024-12-31',
      category: 'discount',
      isUsed: false
    },
    {
      id: 2,
      code: 'CASHBACK50',
      title: '₹50 Cashback',
      description: 'Instant cashback of ₹50 on recharge above ₹300',
      discount: '₹50 Cashback',
      minAmount: '₹300',
      validTill: '2024-12-25',
      category: 'cashback',
      isUsed: false
    },
    {
      id: 3,
      code: 'BONUS100',
      title: '₹100 Bonus Credits',
      description: 'Get ₹100 bonus credits for future recharges',
      discount: '₹100 Bonus',
      minAmount: '₹500',
      validTill: '2024-12-20',
      category: 'bonus',
      isUsed: false
    }
  ];

  const usedCoupons = [
    {
      id: 4,
      code: 'WELCOME25',
      title: '₹25 Welcome Bonus',
      description: 'Welcome bonus for new users',
      discount: '₹25 OFF',
      minAmount: '₹150',
      validTill: '2024-11-30',
      category: 'welcome',
      isUsed: true,
      usedDate: '2024-11-15'
    }
  ];

  const expiredCoupons = [
    {
      id: 5,
      code: 'EXPIRED10',
      title: '₹10 Festival Offer',
      description: 'Special festival discount coupon',
      discount: '₹10 OFF',
      minAmount: '₹100',
      validTill: '2024-11-10',
      category: 'festival',
      isUsed: false
    }
  ];

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discount': return 'bg-blue-100 text-blue-800';
      case 'cashback': return 'bg-green-100 text-green-800';
      case 'bonus': return 'bg-purple-100 text-purple-800';
      case 'welcome': return 'bg-orange-100 text-orange-800';
      case 'festival': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'discount': return 'from-blue-500 to-blue-600';
      case 'cashback': return 'from-green-500 to-green-600';
      case 'bonus': return 'from-purple-500 to-purple-600';
      case 'welcome': return 'from-orange-500 to-orange-600';
      case 'festival': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderCouponCard = (coupon: any, showUsedDate = false) => (
    <Card key={coupon.id} className={`hover:shadow-lg transition-all duration-300 border-0 shadow-md ${coupon.isUsed ? 'opacity-75' : ''}`}>
      <div className={`bg-gradient-to-r ${getCategoryGradient(coupon.category)} p-4 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <Ticket className="h-6 w-6" />
          <Badge className={getCategoryColor(coupon.category)}>
            {coupon.category.charAt(0).toUpperCase() + coupon.category.slice(1)}
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-1">{coupon.title}</h3>
        <div className="text-2xl font-bold">{coupon.discount}</div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-gray-600 text-sm mb-4">{coupon.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Min Amount:</span>
            <span className="font-semibold">{coupon.minAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valid Till:</span>
            <span className="font-semibold text-orange-600">{coupon.validTill}</span>
          </div>
          {showUsedDate && coupon.usedDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Used On:</span>
              <span className="font-semibold text-green-600">{coupon.usedDate}</span>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 mb-4 border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-bold text-gray-700">{coupon.code}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCoupon(coupon.code)}
              className="h-8 text-xs"
              disabled={coupon.isUsed}
            >
              {copiedCoupon === coupon.code ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
        
        {!coupon.isUsed && (
          <Link to="/recharge">
            <Button className={`w-full bg-gradient-to-r ${getCategoryGradient(coupon.category)} hover:opacity-90`}>
              Use Coupon
            </Button>
          </Link>
        )}
        
        {coupon.isUsed && (
          <Button disabled className="w-full bg-gray-300 text-gray-500">
            Already Used
          </Button>
        )}
      </CardContent>
    </Card>
  );

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
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Coupons
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Discount Coupons 🎫
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Save more with your exclusive discount coupons
          </p>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-4 inline-block">
            <p className="font-semibold">💝 You have {activeCoupons.length} active coupons!</p>
          </div>
        </div>

        {/* Coupons Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Active ({activeCoupons.length})</span>
            </TabsTrigger>
            <TabsTrigger value="used" className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Used ({usedCoupons.length})</span>
            </TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Expired ({expiredCoupons.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCoupons.map(coupon => renderCouponCard(coupon))}
            </div>
            {activeCoupons.length === 0 && (
              <Card className="text-center p-8">
                <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Coupons</h3>
                <p className="text-gray-500">Complete more recharges to earn new coupons!</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="used" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usedCoupons.map(coupon => renderCouponCard(coupon, true))}
            </div>
            {usedCoupons.length === 0 && (
              <Card className="text-center p-8">
                <Check className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Used Coupons</h3>
                <p className="text-gray-500">Start using your active coupons to save money!</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredCoupons.map(coupon => renderCouponCard(coupon))}
            </div>
            {expiredCoupons.length === 0 && (
              <Card className="text-center p-8">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Expired Coupons</h3>
                <p className="text-gray-500">Great! You haven't missed any coupons.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Earn More Coupons CTA */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Gift className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Want More Coupons?</h2>
            <p className="text-xl text-orange-100 mb-6">
              Complete recharges and participate in offers to earn more discount coupons!
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/recharge">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Recharge Now
                </Button>
              </Link>
              <Link to="/offers">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  View Offers
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CouponsPage;
