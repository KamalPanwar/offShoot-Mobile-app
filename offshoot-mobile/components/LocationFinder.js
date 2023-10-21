import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from "expo-location";


const LocationFinder = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [place, setPlace] = useState(null);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLocation(location);
        let { longitude, latitude } = location.coords;
  
        let place = await Location.reverseGeocodeAsync({ latitude, longitude });
        setPlace(place);
      })();
    }, []);
  
    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      // console.log(location)
      
      text = JSON.stringify(place);
    }
  return (
    <View>
    <Text style={{fontWeight:700}}>Current Location/Address:</Text>
    {place ? 
    <Text>
      {place ? `${place[0].name},` : " "}
      {place ? `${place[0].district}, ` : " "}
      {place ? `${place[0].city}, ` : " "}
      {place ? `${place[0].region}, ` : " "}
      {place ? `${place[0].country}, ` : " "}
      {place ? `${place[0].postalCode}, ` : " "}
      {location ? `latitude: ${location.coords.latitude},` :""}
      {location ? `longitude: ${location.coords.longitude}, ` :""}
      {location ? `timestamp: ${Date(location.timestamp)}, ` :""}

    </Text>
     :<ActivityIndicator size='large'/>}
  </View>
  )
}

export default LocationFinder

const styles = StyleSheet.create({})