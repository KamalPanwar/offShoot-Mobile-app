import React from "react";
import { SafeAreaView, View, StyleSheet, Text, StatusBar,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { fontSizes } from "../../utils/sizes";

import Constants from "expo-constants"


const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerDiv}>
       
        <Ionicons name="person-circle" size={100} color='white' />
      </View>
      <View style={{marginTop:25}}>
         <Text style={styles.headingText} >Hello, Kamal</Text>
        <View style={styles.infoWrapper}>
          <Ionicons name="person" size={24} color="black" />
          <Text>Kamal</Text>
        </View>
       
        <View style={styles.infoWrapper}>
          <Entypo name="mobile" size={24} color="black" />
          <Text>7247854332</Text>
        </View>
        <View style={styles.infoWrapper}>
          <MaterialIcons name="email" size={24} color="black" />
          <Text>Kamal@gmail.com</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
        //   onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.lg,
              fontWeight: 500,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    ...Platform.select({
      ios: {
        width: '80%', // Reduce container width on iOS
        alignSelf: 'center', // Center the container on iOS
      },
      android:{
        padding:0,
        paddingTop:0
      }
    }),
  },
  headerDiv:{
    flex:0.68,
    
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.lightBlue,
    borderBottomStartRadius:250,
    borderBottomEndRadius:250,
  },
  headingText:{
    fontSize:fontSizes.xl,
    textAlign:'center'
  },
  infoWrapper:{
    flexDirection:'row',
    // backgroundColor:'red',
    margin:10,
    height:50,
   
    alignItems:'center',
    gap:20,
    borderBottomColor:'grey',
    borderBottomWidth:1,

  },
  buttonWrapper: {
    marginTop: 40,
    margin:40,
    height: 50,
  },
  submitButton: {
    flex: 1,
    height: 50,
    backgroundColor: colors.lightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});