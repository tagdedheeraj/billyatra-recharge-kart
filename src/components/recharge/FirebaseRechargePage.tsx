
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, Zap, Gift, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../ui/use-toast';
import ScratchCard from './ScratchCard';

const FirebaseRechargePage = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const { saveTransaction } = useFirestore();
  const { toast } = useToast();
  const [rechargeData, setRechargeData] = useState({
    mobile: '',
    operator: '',
    amount: ''
  });
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const operators = [
    { value: 'jio', label: 'Jio' },
    { value: 'airtel', label: 'Airtel' },
    { value: 'vi', label: 'Vi (Vodafone Idea)' },
    { value: 'bsnl', label: 'BSNL' }
  ];

  const popularPlans = [
    { amount: 149, validity: '24 days', data: '1GB/day', description: 'Unlimited calls + SMS' },
    { amount: 239, validity: '28 days', data: '1.5GB/day', description: 'Unlimited calls + SMS + Disney+' },
    { amount: 299, validity: '28 days', data: '2GB/day', description: 'Unlimited calls + SMS + JioApps' },
    { amount: 399, validity: '56 days', data: '2.5GB/day', description: 'Unlimited calls + SMS + Premium' },
    { amount: 555, validity: '77 days', data: '1.5GB/day', description: 'Unlimited calls + SMS + Netflix' },
    { amount: 719, validity: '84 days', data: '2GB/day', description: 'Unlimited calls + SMS + All Apps' }
  ];

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to continue",
        variant: "destructive"
      });
      navigate('/firebase-auth');
      return;
    }

    if (!rechargeData.mobile || !rechargeData.operator || !rechargeData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (rechargeData.mobile.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    try {
      // Calculate reward (2% of recharge amount)
      const rewardAmount = Math.floor(parseInt(rechargeData.amount) * 0.02);
      
      // Save transaction to Firestore
      const transactionId = await saveTransaction({
        type: 'Mobile Recharge',
        amount: parseInt(rechargeData.amount),
        mobile: rechargeData.mobile,
        operator: operators.find(op => op.value === rechargeData.operator)?.label || rechargeData.operator,
        status: 'success',
        rewardEarned: rewardAmount
      });

      console.log('Transaction saved with ID:', transactionId);
      
      setRechargeSuccess(true);
      
      toast({
        title: "Recharge Successful!",
        description: `₹${rechargeData.amount} recharged to ${rechargeData.mobile}`,
        variant: "default"
      });

      // Show scratch card after a delay
      setTimeout(() => {
        setShowScratchCard(true);
      }, 1500);

    } catch (error) {
      console.error('Recharge failed:', error);
      toast({
        title: "Recharge Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
    
    setProcessing(false);
  };

  const handlePlanSelect = (amount: number) => {
    setRechargeData({...rechargeData, amount: amount.toString()});
  };

  const handlePayment = () => {
    // In a real app, this would integrate with payment gateway
    toast({
      title: "Payment Gateway",
      description: "Payment integration will be added in next phase",
      variant: "default"
    });
  };

  if (showScratchCard) {
    return <ScratchCard onComplete={() => navigate('/firebase-dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/firebase-dashboard" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Mobile Recharge
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {rechargeSuccess ? (
          <Card className="text-center p-8 shadow-xl border-0 bg-white">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Recharge Successful!</h2>
            <p className="text-gray-600 mb-4">₹{rechargeData.amount} recharged to {rechargeData.mobile}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 text-yellow-800">
                <Gift className="h-5 w-5" />
                <span className="font-semibold">You've earned ₹{Math.floor(parseInt(rechargeData.amount) * 0.02)} cashback!</span>
              </div>
            </div>
            <div className="animate-pulse">
              <p className="text-gray-500">Preparing your scratch card...</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recharge Form */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-orange-500" />
                  <span>Quick Recharge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecharge} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Mobile Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={rechargeData.mobile}
                      onChange={(e) => setRechargeData({...rechargeData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      className="h-12"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Select Operator
                    </label>
                    <Select value={rechargeData.operator} onValueChange={(value) => setRechargeData({...rechargeData, operator: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose your operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((operator) => (
                          <SelectItem key={operator.value} value={operator.value}>
                            {operator.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={rechargeData.amount}
                      onChange={(e) => setRechargeData({...rechargeData, amount: e.target.value})}
                      className="h-12"
                      min="10"
                      max="5000"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      disabled={processing}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {processing ? "Processing..." : "Recharge Now"}
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handlePayment}
                      variant="outline"
                      className="w-full h-12 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay with Card/UPI
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Popular Plans */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  <span>Popular Plans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {popularPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handlePlanSelect(plan.amount)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">₹{plan.amount}</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {plan.validity}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          Select
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{plan.data}</p>
                        <p className="text-xs text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features */}
        {!rechargeSuccess && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white border-0">
              <Zap className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instant Recharge</h3>
              <p className="text-sm text-blue-100">Get recharged within seconds</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-green-500 to-teal-500 text-white border-0">
              <Gift className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Earn Cashback</h3>
              <p className="text-sm text-green-100">2% cashback on every recharge</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-orange-500 to-pink-500 text-white border-0">
              <CreditCard className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-orange-100">100% safe and secure transactions</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseRechargePage;
