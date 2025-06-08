
import React from 'react';
import OffersHeader from './OffersHeader';
import OffersHero from './OffersHero';
import OfferCard from './OfferCard';
import OffersCTA from './OffersCTA';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 pb-20 sm:pb-0">
      <OffersHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OffersHero />

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <OffersCTA />
      </div>
    </div>
  );
};

export default OffersPage;
