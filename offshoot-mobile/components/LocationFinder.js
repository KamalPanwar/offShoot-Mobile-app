import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const styles = StyleSheet.create({});

const LocationFinder = (props) => {
  const LOCATION_DISTANCE_THRESHOLD = 1;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    let subscription = null;
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: LOCATION_DISTANCE_THRESHOLD,
        },
        async(location) => {
          let { longitude, latitude } = location.coords;
        let place = await Location.reverseGeocodeAsync({ latitude, longitude });
        setPlace(place);
        }
      );

      
      } catch (error) {
        console.log(error);
      }
      
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location && place) {
    props.addLongitude(location.coords.latitude);
    props.addLatitude(location.coords.longitude);
    text = JSON.stringify(place);
    props.lllocation(text);
  }

  return (
    <View>
      <Text style={{ fontWeight: '700' }}>Current Location/Address:</Text>
      {place ? (
        <Text>
          {place ? `${place[0].name},` : ' '}
          {place ? `${place[0].district}, ` : ' '}
          {place ? `${place[0].city}, ` : ' '}
          {place ? `${place[0].region}, ` : ' '}
          {place ? `${place[0].country}, ` : ' '}
          {place ? `${place[0].postalCode}, ` : ' '}
          {/* {location ? `latitude: ${location.coords.latitude},` :""}
          {location ? `longitude: ${location.coords.longitude}, ` :""}
          {location ? `timestamp: ${new Date(location.timestamp)}, ` :""} */}
        </Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default LocationFinder;
