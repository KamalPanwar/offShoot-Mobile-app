import { View, Text, StyleSheet,StatusBar,SafeAreaView } from "react-native";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants";

const CollectionData = () => {
  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.card}>
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between",paddingHorizontal:15}}>

        <View>
          <Text style={styles.cardTitle}>Customer Name</Text>
          <Text style={styles.cardValue}> Rajender Singh Rathore</Text>
        </View>
        <View>
        <FontAwesome5 name="car" size={35} color="black" />
        </View>
        </View>

        <View style={styles.cardOptionWrapper}>
          <View>
            <Text style={styles.cardTitle}>Mobile Number</Text>
            <Text style={styles.cardValue}>9874563210</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Loan Number </Text>
            <Text style={styles.cardValue}> 66791766</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Total Pos </Text>
            <Text style={styles.cardValue}> ₹13762.02</Text>
          </View>
        <View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
        </View>
      </View>


      <View style={styles.card}>
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between",paddingHorizontal:15}}>

        <View>
          <Text style={styles.cardTitle}>Customer Name</Text>
          <Text style={styles.cardValue}> Rajender Singh Rathore</Text>
        </View>
        <View>
        <FontAwesome5 name="car" size={35} color="black" />
        </View>
        </View>

        <View style={styles.cardOptionWrapper}>
          <View>
            <Text style={styles.cardTitle}>Mobile Number</Text>
            <Text style={styles.cardValue}>9874563210</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Loan Number </Text>
            <Text style={styles.cardValue}> 66791766</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Total Pos </Text>
            <Text style={styles.cardValue}> ₹13762.02</Text>
          </View>
        <View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
        </View>
      </View>
      {/* <Text>
        Address : C 4 204 Aparnaraj Chs Gholani Nagar Kharegaon Kalwa West Thane
        Maharasthra 400605 Mumbai Thane 400605
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    ...Platform.select({
      ios: {
        marginTop:10,
        width: '93%', // Reduce container width on iOS
        alignSelf: 'center', // Center the container on iOS
      },
      android:{
        marginTop:-10,
        width: '110%',
        alignSelf: 'center',
      }
    }),
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
        width:'100%'
      },
    }),
    padding: 12,
    marginBottom: 10,
  },
  

  cardOptionWrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent:"space-around"
  },
  cardTitle:{
fontSize: 12
  },
  cardValue:{
  fontWeight: "bold",
  fontSize:fontSizes.md,
  }
});

export default CollectionData;
