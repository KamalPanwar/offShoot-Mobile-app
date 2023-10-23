import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import axios from "axios";
import * as Location from "expo-location";

const TracedCollection = ({ navigation, route }) => {
  const personNameRef = useRef();
  const personNumberRef = useRef();
  const amountRef = useRef();
  const modeRef = useRef();


  const LOCATION_DISTANCE_THRESHOLD = 1;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [place, setPlace] = useState(null);

  const [curLat, setCurLat] = useState();
  const [curLon, setCurLon] = useState();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        Location.installWebGeolocationPolyfill();
        const currentLocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation(currentLocation);
        setCurLat(latitude);
        setCurLon(longitude)
        const { longitude, latitude } = currentLocation.coords;

        const fetchedPlace = await Location.reverseGeocodeAsync({ latitude, longitude });
        setPlace(fetchedPlace);
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Error fetching location');
      }
    };

    fetchLocation();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(place);
  }

  function handleSumbit() {
    const obj = {
      status: "Traced",
      loanId: route.params.loanId,
      personName: personNameRef.current.value,
      personNumber: personNumberRef.current.value,
      paymentAmout: amountRef.current.value,
      paymentMode: modeRef.current.value,
      latitude: curLat,
      longitude: curLon,
      lllocation: place,
      date: Date(),
    };

    async function sendData() {
      const response = await axios.post(
        "https://pg-api-45dn.onrender.com/traced",
        {
          obj,
        }
      );
      if (response) {
        navigation.navigate("Root");
      }
    }

    Alert.alert("Sumbitting Data", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => sendData() },
    ]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ margin: 30 }}>
     
          <TextInput
            style={styles.inputtext}
            placeholder="Contact Person Name"
            ref={personNameRef}
            onChangeText={(e) => (personNameRef.current.value = e)}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Contact Person Number"
            ref={personNumberRef}
            onChangeText={(e) => (personNumberRef.current.value = e)}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Payment Amount"
            ref={amountRef}
            onChangeText={(e) => (amountRef.current.value = e)}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="Payment Mode"
            ref={modeRef}
            onChangeText={(e) => (modeRef.current.value = e)}
          />

          <View>
            <Text style={{ fontWeight: "700" }}>Current Location/Address:</Text>
            {place ? (
              <Text>
                {place ? `${place[0].name},` : " "}
                {place ? `${place[0].district}, ` : " "}
                {place ? `${place[0].city}, ` : " "}
                {place ? `${place[0].region}, ` : " "}
                {place ? `${place[0].country}, ` : " "}
                {place ? `${place[0].postalCode}, ` : " "}

                {location ? `latitude: ${location.coords.latitude},` : ""}
                {location ? `longitude: ${location.coords.longitude}, ` : ""}
                {location ? `timestamp: ${new Date(location.timestamp)}, ` : ""}
              </Text>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>

          <View style={styles.imageWrapper}>
            <TouchableOpacity>
              <FontAwesome5
                style={styles.signIcon}
                name="signature"
                size={90}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                style={styles.cameraIcon}
                name="camera"
                size={109}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                style={styles.cameraIcon}
                name="camera"
                size={109}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                style={styles.cameraIcon}
                name="camera"
                size={109}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Pressable style={styles.button} onPress={handleSumbit}>
            <Text style={styles.textStyle}>SUBMIT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TracedCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    ...Platform.select({
      ios: {
        width: "80%", // Reduce container width on iOS
        alignSelf: "center", // Center the container on iOS
      },
      android: {
        padding: 0,
        paddingTop: 0,
      },
    }),
  },
  inputtext: {
    height: 50,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 8,

    marginBottom: 10,
    paddingLeft: 10,
  },
  imageWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cameraIcon: {
    borderColor: "black",
    borderWidth: 2,
    margin: 3,
  },
  signIcon: {
    borderColor: "black",
    borderWidth: 2,
    margin: 3,
    height: 120,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    padding: 10,
    margin: 4,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
