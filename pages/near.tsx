import React, { useState, useEffect } from 'react';
import {
    createStyles,
    Text,
    Container,
    ActionIcon,
    Group,
    rem,
    Paper,
    Input,
    Button,
    Switch,
    Title,
    Center,
} from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    mainbod:{
        textAlign:"center",
        marginTop:rem(150),
    },

   
}))

const NearbyPlaces: React.FC = () => {
    const { classes } = useStyles()
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    // Get user's coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error accessing geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Fetch nearby places when latitude and longitude are available
    if (latitude && longitude) {
      fetchNearbyPlaces();
    }
  }, [latitude, longitude]);

  const fetchNearbyPlaces = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      const city = data.address.city || data.address.town || data.address.village;
      const nearbyPlaces = await getNearbyPoliceAndHospitals(city);

      setPlaces(nearbyPlaces);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  const getNearbyPoliceAndHospitals = async (city: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&polygon=1&addressdetails=1&extratags=1&namedetails=1&limit=10`
      );
      const data = await response.json();

      const nearbyPlaces = data.filter(
        (place: any) =>
          place.category === 'amenity' &&
          (place.type === 'police' || place.type === 'hospital')
      );

      return nearbyPlaces;
    } catch (error) {
      console.error('Error fetching nearby police and hospitals:', error);
      return [];
    }
  };

  return (
    <div className={classes.mainbod}>
      <h1>Nearby Police Stations and Hospitals</h1>
      {latitude && longitude ? (
        <div>
          <p>Your current coordinates: Latitude {latitude}, Longitude {longitude}</p>
          {places.length > 0 ? (
            <div>
              <h2>Nearby Places:</h2>
              <ul>
                {places.map((place) => (
                  <li key={place.place_id}>
                    <p>Name: {place.display_name}</p>
                    <p>Address: {place.address?.[place.type]}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No nearby police stations or hospitals found within 2 km.</p>
          )}
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default NearbyPlaces;