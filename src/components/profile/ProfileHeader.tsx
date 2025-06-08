
import React from 'react';
import { User, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    joinDate: string;
  };
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader = ({ userProfile, isEditing, onEditToggle }: ProfileHeaderProps) => {
  return (
    <Card className="mb-8 shadow-xl border-0 bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-purple-100">
                Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <Button
            onClick={onEditToggle}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
