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
} from "react-native";
import React, { useRef,useState } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import LocationFinder from "../../components/LocationFinder";
import axios from "axios";

const UntracableCollection = ({ navigation }) => {
  const dispositionRef = useRef();
  const remarkRef = useRef();
  const [longitude, setLongitude] = useState();
  const [latitude,setLatitude] = useState();

  function handleSumbit() {
    const obj = {
      status:"Untracable",
      loanId :route.params.loanId,
      disposition: dispositionRef.current.value,
      remark: remarkRef.current.value,
    };

    async function sendData() {
      const response = await axios.post("http://192.168.1.11:3000/untracable", {
        obj,
      });
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
          {/* 
        Disposition
        FE_REMARKS
          lat/long
          time stamp
          image - 4
        */}
          <LocationFinder addLongitude={setLongitude} addLatitude={setLatitude}/>
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
