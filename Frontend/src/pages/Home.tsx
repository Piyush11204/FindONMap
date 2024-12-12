import React, { useState, useEffect, useCallback } from 'react';
import MapComponent from '../components/Mapcomponent.tsx';
import ProfileCard from '../components/Profilecard.tsx';
import { Profile } from '../Types';
import { fetchProfiles } from '../components/ProfileService.tsx';

const Home: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('name'); // Default sorting by name
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const loadProfiles = useCallback(async () => {
    try {
      const fetchedProfiles = await fetchProfiles();
      setProfiles(fetchedProfiles);
      setFilteredProfiles(fetchedProfiles);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  useEffect(() => {
    let updatedProfiles = profiles;

    // Apply search filtering
    if (searchQuery.trim() !== '') {
      try {
        const regex = new RegExp(searchQuery, 'i'); // Case-insensitive regex
        updatedProfiles = updatedProfiles.filter(
          (profile) =>
            regex.test(profile.name) ||
            regex.test(profile.email || '') ||
            regex.test(profile.address || '')
        );
      } catch (e) {
        console.error('Invalid regex:', e);
      }
    }

    // Apply sorting
    updatedProfiles = updatedProfiles.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'email') {
        return (a.email || '').localeCompare(b.email || '');
      }
      return 0; // Default fallback
    });

    setFilteredProfiles(updatedProfiles);
  }, [searchQuery, sortOption, profiles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleLocationClick = (longitude: number, latitude: number) => {
    if (map) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 8,
        speed: 0.5,
        curve: 1,
      });
    }
  };

  const handleMapLoad = (loadedMap: mapboxgl.Map) => {
    setMap(loadedMap);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl mt-12 font-bold text-gray-800 mb-6 text-center">User Profiles Map</h1>

      {/* Search and Sort Bar */}
     

      {/* Map */}
      <MapComponent profiles={filteredProfiles} onMapLoad={handleMapLoad} />
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name, email, or address"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 border rounded-md p-2 mb-4 md:mb-0"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full md:w-auto border rounded-md p-2"
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onLocationClick={handleLocationClick}
            />
          ))
        ) : (
          <p className="text-gray-500">No profiles match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
