import React, { useState } from 'react';

const ProfileForm = ({
  initialData = {
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
    profileImageUrl: '',
    address: '',
    latitude: '',
    longitude: '',
  },
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('longitude', formData.longitude);

    if (imageFile) {
      formDataToSend.append('profileImage', imageFile);
    }

    onSubmit(formDataToSend);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Profile' : 'Create New Profile'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isEditing ? 'Update Profile' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
