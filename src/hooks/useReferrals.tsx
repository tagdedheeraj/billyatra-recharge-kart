
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useFirebaseAuth } from './useFirebaseAuth';

interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  totalRewardsEarned: number;
  referralCode: string;
}

interface Referral {
  id: string;
  referrerUserId: string;
  referredEmail: string;
  status: 'pending' | 'completed' | 'rewarded';
  rewardAmount: number;
  createdAt: any;
  completedAt?: any;
}

export const useReferrals = () => {
  const { user } = useFirebaseAuth();
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    successfulReferrals: 0,
    totalRewardsEarned: 0,
    referralCode: ''
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadReferralStats();
      loadReferrals();
    }
  }, [user]);

  const generateReferralCode = () => {
    return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const loadReferralStats = async () => {
    if (!user) return;

    try {
      const statsRef = doc(db, 'user_referral_stats', user.uid);
      const statsSnap = await getDoc(statsRef);

      if (statsSnap.exists()) {
        const data = statsSnap.data();
        setReferralStats({
          totalReferrals: data.totalReferrals || 0,
          successfulReferrals: data.successfulReferrals || 0,
          totalRewardsEarned: data.totalRewardsEarned || 0,
          referralCode: data.referralCode || ''
        });
      } else {
        // Create initial referral stats
        const newCode = generateReferralCode();
        const initialStats = {
          totalReferrals: 0,
          successfulReferrals: 0,
          totalRewardsEarned: 0,
          referralCode: newCode,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await setDoc(statsRef, initialStats);
        setReferralStats({
          totalReferrals: 0,
          successfulReferrals: 0,
          totalRewardsEarned: 0,
          referralCode: newCode
        });
      }
    } catch (error) {
      console.error('Error loading referral stats:', error);
    }
  };

  const loadReferrals = async () => {
    if (!user) return;

    try {
      const referralsRef = collection(db, 'referrals');
      const q = query(referralsRef, where('referrerUserId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const referralList: Referral[] = [];
      querySnapshot.forEach((doc) => {
        referralList.push({ id: doc.id, ...doc.data() } as Referral);
      });

      setReferrals(referralList);
    } catch (error) {
      console.error('Error loading referrals:', error);
    }
  };

  const sendReferral = async (email: string) => {
    if (!user || !referralStats.referralCode) return null;

    setLoading(true);
    try {
      const referralData = {
        referrerUserId: user.uid,
        referredEmail: email,
        referralCode: referralStats.referralCode,
        status: 'pending',
        rewardAmount: 50,
        createdAt: new Date(),
        firstRechargeCompleted: false
      };

      const docRef = await addDoc(collection(db, 'referrals'), referralData);

      // Update referral stats
      const statsRef = doc(db, 'user_referral_stats', user.uid);
      await updateDoc(statsRef, {
        totalReferrals: referralStats.totalReferrals + 1,
        updatedAt: new Date()
      });

      // Reload data
      await loadReferralStats();
      await loadReferrals();

      return docRef.id;
    } catch (error) {
      console.error('Error sending referral:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const processReferralReward = async (referredUserEmail: string) => {
    if (!user) return;

    try {
      // Find the referral
      const referralsRef = collection(db, 'referrals');
      const q = query(
        referralsRef, 
        where('referredEmail', '==', referredUserEmail),
        where('status', '==', 'pending')
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const referralDoc = querySnapshot.docs[0];
        const referralData = referralDoc.data();

        // Update referral status
        await updateDoc(doc(db, 'referrals', referralDoc.id), {
          status: 'completed',
          completedAt: new Date(),
          firstRechargeCompleted: true
        });

        // Update referrer's stats and add reward
        const referrerStatsRef = doc(db, 'user_referral_stats', referralData.referrerUserId);
        const referrerStatsSnap = await getDoc(referrerStatsRef);
        
        if (referrerStatsSnap.exists()) {
          const currentStats = referrerStatsSnap.data();
          await updateDoc(referrerStatsRef, {
            successfulReferrals: (currentStats.successfulReferrals || 0) + 1,
            totalRewardsEarned: (currentStats.totalRewardsEarned || 0) + referralData.rewardAmount,
            updatedAt: new Date()
          });
        }

        // Update referrer's user profile rewards
        const referrerProfileRef = doc(db, 'users', referralData.referrerUserId);
        const referrerProfileSnap = await getDoc(referrerProfileRef);
        
        if (referrerProfileSnap.exists()) {
          const currentProfile = referrerProfileSnap.data();
          await updateDoc(referrerProfileRef, {
            rewardsEarned: (currentProfile.rewardsEarned || 0) + referralData.rewardAmount
          });
        }
      }
    } catch (error) {
      console.error('Error processing referral reward:', error);
    }
  };

  return {
    referralStats,
    referrals,
    loading,
    sendReferral,
    processReferralReward,
    loadReferralStats,
    loadReferrals
  };
};
