
import React from 'react';
import { User, Mail, Phone, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ProfileDetailsProps {
  userProfile: {
    name: string;
    email: string;
    mobile: string;
    joinDate: string;
  };
  isEditing: boolean;
  onUserProfileChange: (updates: Partial<typeof userProfile>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileDetails = ({ 
  userProfile, 
  isEditing, 
  onUserProfileChange, 
  onSave, 
  onCancel 
}: ProfileDetailsProps) => {
  return (
    <Card className="shadow-xl border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Personal Information</span>
          {isEditing && (
            <div className="flex space-x-2">
              <Button onClick={onSave} size="sm" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={onCancel} size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={userProfile.name}
                onChange={(e) => onUserProfileChange({ name: e.target.value })}
                className="pl-10 h-12"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                value={userProfile.email}
                onChange={(e) => onUserProfileChange({ email: e.target.value })}
                className="pl-10 h-12"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="tel"
                value={userProfile.mobile}
                onChange={(e) => onUserProfileChange({ mobile: e.target.value })}
                className="pl-10 h-12"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Member Since
            </label>
            <div className="relative">
              <Input
                type="text"
                value={new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric' 
                })}
                className="h-12"
                disabled
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
