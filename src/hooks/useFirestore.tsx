
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useFirebaseAuth } from './useFirebaseAuth';

export const useFirestore = () => {
  const { user } = useFirebaseAuth();

  const saveTransaction = async (transactionData: {
    type: string;
    amount: number;
    mobile: string;
    operator: string;
    status: 'success' | 'pending' | 'failed';
    rewardEarned?: number;
  }) => {
    if (!user) return null;

    try {
      const transaction = {
        ...transactionData,
        userId: user.uid,
        timestamp: serverTimestamp(),
        userEmail: user.email
      };

      const docRef = await addDoc(collection(db, 'transactions'), transaction);
      
      // Update user profile stats
      await updateUserStats(transactionData.amount, transactionData.rewardEarned || 0);
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
    }
  };

  const updateUserStats = async (amount: number, reward: number) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const currentData = userSnap.data();
        await updateDoc(userRef, {
          totalRecharges: (currentData.totalRecharges || 0) + 1,
          totalAmount: (currentData.totalAmount || 0) + amount,
          rewardsEarned: (currentData.rewardsEarned || 0) + reward
        });
      }
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  };

  const getUserProfile = async () => {
    if (!user) return null;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };

  return {
    saveTransaction,
    updateUserStats,
    getUserProfile
  };
};
