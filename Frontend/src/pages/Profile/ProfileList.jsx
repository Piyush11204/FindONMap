
import { Trash2, Edit } from 'lucide-react';
import PropTypes from 'prop-types';

const ProfileList = ({ profiles, onEditProfile, onDeleteProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map(profile => (
        <div key={profile._id} className="border rounded-lg p-4 shadow">
          {profile.profileImageUrl && (
            <img 
              src={profile.profileImageUrl} 
              alt={profile.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p className="mt-2">{profile.description}</p>
          <div className="flex space-x-2 mt-4">
            <button 
              className="px-4 py-2 border rounded-md hover:bg-gray-100" 
              onClick={() => onEditProfile(profile)}
            >
              <Edit className="inline-block mr-2" size={16} /> Edit
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => onDeleteProfile(profile._id)}
            >
              <Trash2 className="inline-block mr-2" size={16} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
ProfileList.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
};

export default ProfileList;
