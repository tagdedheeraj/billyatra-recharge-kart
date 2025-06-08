
import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const ProfileActions = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6 text-center">
          <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loyalty Program</h3>
          <p className="text-gray-600 text-sm mb-4">You're a valued member with special benefits</p>
          <Link to="/offers">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View Benefits
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent className="p-6 text-center">
          <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
          <p className="text-gray-600 text-sm mb-4">Invite friends and earn rewards together</p>
          <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50">
            Refer Friends
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileActions;
