import { Profile } from '../Types';

export const fetchProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/profiles/getall');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};