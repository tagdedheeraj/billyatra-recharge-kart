
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Gift, Share2, Copy, Mail, Phone, Check, Star, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useReferrals } from '../../hooks/useReferrals';
import { useToast } from '../ui/use-toast';

const ReferralPage = () => {
  const { user } = useFirebaseAuth();
  const { referralStats, referrals, loading, sendReferral } = useReferrals();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSending(true);
    try {
      await sendReferral(email.trim());
      toast({
        title: "Referral Sent!",
        description: `Invitation sent to ${email}`,
        variant: "default"
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send referral",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralStats.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
      variant: "default"
    });
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/firebase-auth?ref=${referralStats.referralCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join Billyatra',
        text: `Join me on Billyatra and get ₹50 bonus! Use my referral code: ${referralStats.referralCode}`,
        url: referralLink
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Referral link copied to clipboard",
        variant: "default"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Refer & Earn
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Invite Friends & Earn ₹50
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share Billyatra with friends and family. When they sign up and make their first recharge, 
            you both get ₹50 bonus!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{referralStats.totalReferrals}</div>
              <div className="text-sm text-gray-600">Total Invites</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{referralStats.successfulReferrals}</div>
              <div className="text-sm text-gray-600">Successful Referrals</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">₹{referralStats.totalRewardsEarned}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Actions */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-orange-500" />
                <span>Share Your Code</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Referral Code Display */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Referral Code
                </label>
                <div className="flex space-x-2">
                  <Input
                    value={referralStats.referralCode}
                    readOnly
                    className="font-mono text-lg font-bold text-center"
                  />
                  <Button onClick={copyReferralCode} variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Share */}
              <div>
                <Button
                  onClick={shareReferralLink}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Referral Link
                </Button>
              </div>

              {/* Send Invitation */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Send Invitation by Email
                </label>
                <form onSubmit={handleSendReferral} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="friend@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={sending || !email.trim()}>
                    <Mail className="h-4 w-4 mr-2" />
                    {sending ? 'Sending...' : 'Send'}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Share Your Code</h4>
                    <p className="text-sm text-gray-600">Send your referral code to friends via email, SMS, or social media</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Friend Signs Up</h4>
                    <p className="text-sm text-gray-600">Your friend creates an account using your referral code</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">First Recharge</h4>
                    <p className="text-sm text-gray-600">When they complete their first recharge, you both get ₹50!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-700">
                  <Gift className="h-5 w-5" />
                  <span className="font-semibold">Bonus Tip!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  The more friends you refer, the more you earn. There's no limit to your earnings!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral History */}
        <Card className="mt-8 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span>Your Referrals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {referrals.length > 0 ? (
                referrals.map((referral) => (
                  <div key={referral.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{referral.referredEmail}</p>
                        <p className="text-sm text-gray-600">
                          Invited on {new Date(referral.createdAt.toDate()).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(referral.status)}`}>
                          {referral.status === 'completed' ? 'Rewarded' : 'Pending'}
                        </span>
                        {referral.status === 'completed' && (
                          <p className="text-green-600 font-bold text-sm mt-1">₹{referral.rewardAmount}</p>
                        )}
                      </div>
                    </div>
                    {referral.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-green-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>Reward earned!</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No referrals yet</p>
                  <p className="text-sm text-gray-400">Start inviting friends to earn rewards!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralPage;
