import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

import axios from "axios";
import * as Location from "expo-location";

const UntracableCollection = ({ navigation, route }) => {
  const dispositionRef = useRef();
  const remarkRef = useRef();


  const LOCATION_DISTANCE_THRESHOLD = 1;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [place, setPlace] = useState(null);

  const [curLat, setCurLat] = useState();
  const [curLon, setCurLon] = useState();

  useEffect(() => {
    let subscription = null;
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: LOCATION_DISTANCE_THRESHOLD,
          },
          async (locations) => {
            setLocation(locations)
            let { longitude, latitude } = locations.coords;
            setCurLat(locations.coords.latitude);
            setCurLon(locations.coords.latitude);

            let place = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });
            setPlace(place);
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location && place) {
   
    text = JSON.stringify(place);
 
  }

  function handleSumbit() {
    const obj = {
      status: "Untracable",
      loanId: route.params.loanId,
      disposition: dispositionRef.current.value,
      remark: remarkRef.current.value,
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
            placeholder="Disposition"
            ref={dispositionRef}
            onChangeText={(e) => (dispositionRef.current.value = e)}
          />
          <TextInput
            style={styles.inputtext}
            placeholder="FE_REMARKS"
            ref={remarkRef}
            onChangeText={(e) => (remarkRef.current.value = e)}
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

export default UntracableCollection;

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
    marginTop: 15,
  },

  cameraIcon: {
    borderColor: "black",
    borderWidth: 2,
    margin: 2,
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
