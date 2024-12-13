import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/profiles/${id}`);
        setProfile(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 mx-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-16 text-gray-500">
        <p>Profile not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
          {profile.profileImageUrl ? (
            <img
              src={`${profile.profileImageUrl}`}
              alt={profile.name}
              className="w-32 h-32 md:w-48 md:h-48 rounded-[10px] object-cover border-2 border-blue-100 mb-4 md:mb-0"
            />
          ) : (
            <div className="w-32 h-32 md:w-48 md:h-48 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              <span className="text-sm">No Image</span>
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            {/* <p className="text-gray-600">{profile.phoneNumber}</p> */}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Details</h2>
          <p className="text-gray-700 mt-2">
            <strong>Address:</strong> {profile.address}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Phone:</strong> {profile.phoneNumber}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Description:</strong> {profile.description}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Latitude:</strong> {profile.latitude}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Longitude:</strong> {profile.longitude}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
