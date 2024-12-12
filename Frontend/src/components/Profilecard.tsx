import React from 'react';
import { Profile } from '../Types';

interface ProfileCardProps {
  profile: Profile;
  onLocationClick: (longitude: number, latitude: number) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onLocationClick }) => {
  const handleLocationClick = () => {
    if (profile.longitude && profile.latitude) {
      onLocationClick(profile.longitude, profile.latitude);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex-shrink-0">
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{profile.name}</h3>
        {profile.email && <p className="text-gray-600 text-sm truncate">{profile.email}</p>}
        {profile.address && <p className="text-gray-500 text-xs truncate">{profile.address}</p>}
      </div>
      <button
        onClick={handleLocationClick}
        disabled={!profile.longitude || !profile.latitude}
        className="px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
      >
        View Location
      </button>
    </div>
  );
};

export default ProfileCard;