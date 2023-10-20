import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
  Pressable
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from "../../utils/colors";




const TracedCollection = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 30 }}>
        <TextInput style={styles.inputtext} placeholder="Contact Person Name" />
        <TextInput
          style={styles.inputtext}
          placeholder="Contact Person Number"
        />
        <TextInput style={styles.inputtext} placeholder="Address" />
    
      <View style={styles.imageWrapper}>
        <TouchableOpacity>
       
          <FontAwesome5 style={styles.signIcon} name="signature" size={120}  color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.cameraIcon}
            name="camera"
            size={150}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.cameraIcon}
            name="camera"
            size={150}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.cameraIcon}
            name="camera"
            size={150}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Pressable
              style={styles.button}
              
              >
              <Text style={styles.textStyle}>SUBMIT</Text>
            </Pressable>
      </View>
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
    margin: 6,
    height:165,
  },
  signIcon:{
    borderColor: "black",
    borderWidth: 2,
    margin: 6,
    height:165,
  },
  button: {
    borderRadius: 10,
    backgroundColor:colors.lightBlue,
    padding: 10,
    margin:4,
    elevation: 2,
    

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
