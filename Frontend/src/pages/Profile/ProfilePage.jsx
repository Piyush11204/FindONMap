import  { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import ProfileForm from "./ProfileFrom";
const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profiles/getall');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        setErrorMessage('Failed to fetch profiles');
        console.error('Failed to fetch profiles');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching profiles');
      console.error('Failed to fetch profiles', error);
    }
  };

  // Create profile
  const createProfile = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/profiles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProfile = await response.json();
        setProfiles([...profiles, newProfile]);
        setIsCreateModalOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create profile');
        console.error('Failed to create profile', errorData);
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating the profile');
      console.error('Error creating profile', error);
    }
  };

  // Delete profile
  const deleteProfile = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/profiles/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProfiles(profiles.filter(profile => profile._id !== id));
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to delete profile');
        console.error('Failed to delete profile', errorData);
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting the profile');
      console.error('Error deleting profile', error);
    }
  };

  // Update profile
  const updateProfile = async (formData) => {
    if (!selectedProfile?._id) {
      setErrorMessage('No profile selected');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/profiles/${selectedProfile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfiles(profiles.map(profile => 
          profile._id === updatedProfile._id ? updatedProfile : profile
        ));
        setSelectedProfile(null);
        setIsCreateModalOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to update profile');
        console.error('Failed to update profile', errorData);
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the profile');
      console.error('Error updating profile', error);
    }
  };

  // Edit profile handler
  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsCreateModalOpen(true);
  };

  // Close form handler
  const handleCloseForm = () => {
    setIsCreateModalOpen(false);
    setSelectedProfile(null);
    setErrorMessage('');
  };

  // Use effect to fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profiles</h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {/* Create Profile Button */}
      <button 
        onClick={() => {
          setSelectedProfile(null);
          setIsCreateModalOpen(true);
          setErrorMessage('');
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create New Profile
      </button>

      {/* Profile List */}
      <ProfileList 
        profiles={profiles} 
        onEditProfile={handleEditProfile}
        onDeleteProfile={deleteProfile}
      />

      {/* Create/Edit Profile Form */}
      {isCreateModalOpen && (
        <ProfileForm 
          initialData={selectedProfile || undefined}
          onSubmit={selectedProfile ? updateProfile : createProfile}
          onCancel={handleCloseForm}
          isEditing={!!selectedProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;