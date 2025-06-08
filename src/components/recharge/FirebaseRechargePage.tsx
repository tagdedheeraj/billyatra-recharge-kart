
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Smartphone, 
  Zap, 
  Gift, 
  Crown, 
  Star, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Trophy,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useFirestore } from '../../hooks/useFirestore';
import { useToast } from '../ui/use-toast';
import { useNotificationService } from '../../hooks/useNotificationService';
import ScratchCard from './ScratchCard';

const FirebaseRechargePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useFirebaseAuth();
  const { saveTransaction } = useFirestore();
  const { toast } = useToast();
  const { notifyTransaction, notifyOffer } = useNotificationService();
  
  const [mobile, setMobile] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/firebase-auth');
    }
  }, [user, loading, navigate]);

  const operators = [
    { value: 'jio', label: 'Jio' },
    { value: 'airtel', label: 'Airtel' },
    { value: 'vi', label: 'Vi (Vodafone Idea)' },
    { value: 'bsnl', label: 'BSNL' }
  ];

  const plans = [
    { value: 'basic', label: 'Basic', amount: 100 },
    { value: 'premium', label: 'Premium', amount: 200 },
    { value: 'ultimate', label: 'Ultimate', amount: 300 }
  ];

  const handleRecharge = async () => {
    if (!selectedPlan || !mobile || !selectedOperator) {
      toast({
        title: "Incomplete Information",
        description: "Please select an operator, enter mobile number and choose a plan",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Notify that processing has started
      notifyTransaction('pending', selectedPlan.amount, mobile);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        // Calculate reward (2% of recharge amount)
        const rewardAmount = Math.floor(selectedPlan.amount * 0.02);

        // Save transaction to Firestore
        await saveTransaction({
          type: 'mobile_recharge',
          amount: selectedPlan.amount,
          mobile,
          operator: selectedOperator,
          status: 'success',
          rewardEarned: rewardAmount
        });

        // Send success notification
        notifyTransaction('success', selectedPlan.amount, mobile);

        // Show success and scratch card
        setRechargeSuccess(true);
        setShowScratchCard(true);

        // Send promotional offers occasionally
        if (Math.random() > 0.7) {
          setTimeout(() => {
            notifyOffer(
              "🎯 Next Recharge Offer",
              "Get 15% extra on your next recharge above ₹200!",
              "/offers"
            );
          }, 3000);
        }

        toast({
          title: "Recharge Successful! 🎉",
          description: `₹${selectedPlan.amount} recharged successfully. You earned ₹${rewardAmount} cashback!`,
        });

      } else {
        // Send failure notification
        notifyTransaction('failed', selectedPlan.amount, mobile);
        
        toast({
          title: "Recharge Failed",
          description: "Unable to process your recharge. Please try again.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Recharge error:', error);
      notifyTransaction('failed', selectedPlan.amount, mobile);
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (showScratchCard) {
    return (
      <ScratchCard 
        amount={Math.floor(selectedPlan.amount * 0.02)}
        onComplete={() => {
          setShowScratchCard(false);
          navigate('/firebase-dashboard');
        }} 
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

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
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instant Mobile Recharge
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recharge your mobile instantly and securely with Billyatra. Get exciting cashback offers and rewards!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-md border-0">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Fast & Easy</h3>
              <p className="text-sm text-gray-600">Recharge in seconds</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-4 text-center">
              <Gift className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Cashback Offers</h3>
              <p className="text-sm text-gray-600">Get exciting rewards</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-600">100% safe & secure</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recharge Form */}
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
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
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Operator
                  </label>
                  <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Plan
                  </label>
                  <Select value={selectedPlan?.value} onValueChange={(value) => {
                    const plan = plans.find(p => p.value === value);
                    setSelectedPlan(plan);
                  }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label} - ₹{plan.amount}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-lg font-semibold"
                  disabled={isProcessing || !selectedPlan || !mobile || !selectedOperator}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Recharge Now
                    </>
                  )}
                </Button>
              </form>

              {selectedPlan && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Recharge Amount:</span>
                    <span className="font-bold text-gray-900">₹{selectedPlan.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Cashback (2%):</span>
                    <span className="font-bold text-green-600">₹{Math.floor(selectedPlan.amount * 0.02)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Recharge</h3>
                    <p className="text-sm text-gray-600">Get recharged in seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">2% Cashback</h3>
                    <p className="text-sm text-gray-600">Earn rewards on every recharge</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Secure</h3>
                    <p className="text-sm text-gray-600">Safe and encrypted transactions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseRechargePage;
