import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fontSizes } from "../../utils/sizes";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import CollectionModal from "../../components/CollectionModal";
import { colors } from "../../utils/colors";
import axios from "axios";

const CollectionData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [currentCust,setCurrentCust]=useState()



  const handleVisible=(e)=>{
    setModalVisible(!modalVisible)
    const id=e.collectionid
    const obj=apiData.find(ele=>ele.collectionid==id)
  
    setCurrentCust(obj)

  }

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await axios.get("http://192.168.1.11:3000/coldata");

        setApiData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {apiData.map((item) => {
          return (
            <React.Fragment>
              <TouchableWithoutFeedback 
              
                onPress={()=>handleVisible(item)}
              >
                <View style={styles.card}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 15,
                    }}
                  >
                    <View>
                      <Text style={styles.cardTitle}>Customer Name</Text>
                      <Text style={styles.cardValue}> {item.customername}</Text>
                    </View>
                    <View>
                      <FontAwesome5
                        name="car"
                        size={35}
                        color={colors.iconColor}
                      />
                    </View>
                  </View>

                  <View style={styles.cardOptionWrapper}>
                    <View>
                      <Text style={styles.cardTitle}>Mobile Number</Text>
                      <Text style={styles.cardValue}>{item.mobileno}</Text>
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>Loan Number </Text>
                      <Text style={styles.cardValue}>
                        {item.loancardaccountno}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>Total Due </Text>
                      <Text style={styles.cardValue}> ₹{item.totaldue}</Text>
                    </View>
                    <View>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={24}
                        color="black"
                        onPress={() => setModalVisible(!modalVisible)}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
       
            </React.Fragment>
          );
        })}
       <CollectionModal 
        colData={currentCust}
          navigation={navigation}
          modalVisible={modalVisible}
          onHide={() => setModalVisible(!modalVisible)}
        />
       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    ...Platform.select({
      ios: {
        marginTop: 10,
        width: "93%", // Reduce container width on iOS
        alignSelf: "center", // Center the container on iOS
      },
      android: {
        marginTop: -10,
        width: "110%",
        alignSelf: "center",
      },
    }),
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
        width: "100%",
      },
    }),
    padding: 12,
    marginBottom: 10,
  },

  cardOptionWrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardTitle: {
    fontSize: 12,
  },
  cardValue: {
    fontWeight: "bold",
    fontSize: fontSizes.md,
  },
});

export default CollectionData;
