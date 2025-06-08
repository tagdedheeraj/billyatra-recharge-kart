
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const OffersCTA = () => {
  return (
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
  );
};

export default OffersCTA;
