# User Profiles Map

A React-based application for managing and displaying user profiles on an interactive map. This app includes features like profile filtering, sorting, and dynamic map navigation.

## Features
- **Interactive Map**: Visualize user locations on a dynamic map.
- **Profile Management**: View user profiles with detailed information, including images, addresses, and contact details.
- **Search Functionality**: Filter profiles by name, email, or address using regex.
- **Sorting Options**: Sort profiles by name or email for better organization.
- **Dynamic Map Navigation**: Fly to user locations on the map with a single click.

## JUST FOR TESTING 
- I HAVEN'T REMOVE THE ENV AND API KEY FROM THE CODE 

## Components Overview
### 1. `ProfileForm`
- A reusable form for creating or editing user profiles.
- Supports fields like name, email, phone, address, and more.

### 2. `ProfileCard`
- Displays individual user profiles in a card format.
- Includes a "View Location" button for map navigation.

### 3. `MapComponent`
- Integrates Mapbox GL to display user locations dynamically.

### 4. `Home`
- The main page combining all components.
- Includes a search bar, sorting options, and the map.

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-profiles-map.git
   cd user-profiles-map
