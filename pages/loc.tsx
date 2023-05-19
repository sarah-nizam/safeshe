import React, { useState } from 'react';
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Box,
} from "@mantine/core"

const useStyles = createStyles((theme) => ({
  sosb:{
    cursor:"pointer",
    height:rem(100),
    width:rem(250),
    borderRadius:10,
    borderColor:theme.colors.brand[0] ,
    backgroundColor:theme.colors.brand[6],
    fontSize:rem(20),

    "&:hover": {
      background: theme.colors.brand[6],
      color: "white",

      "& .icon": {
          backgroundColor: "white",
      },
  },

  },

  mainbod:{
  textAlign: "center",
  marginTop:rem(80),
  },

  title:{
    fontWeight:200,
    fontSize:12,
  },
 
}))

interface Coordinates {
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const { classes } = useStyles()
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Error getting your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className={classes.mainbod}>
      <h1>Location Sharing</h1>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>No location shared yet.</p>
      )}

      {error && <p>{error}</p>}

      <button className={classes.sosb} onClick={handleLocationClick}>Share Location</button>
    </div>
  );
};

export default App;