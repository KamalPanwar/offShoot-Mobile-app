import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { Divider } from "@rneui/base";

const CollectionModal = (props) => {
  const collectionData = props.colData;

  function handleTraced() {
    props.onHide();
    props.navigation.navigate("Traced Collection",{loanId:collectionData.loancardaccountno});
  }
  function handleUntracable() {
    props.onHide();
    props.navigation.navigate("Untracable Collection",{loanId:collectionData.loancardaccountno});
  }
  if (collectionData) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text
                  style={{
                    fontSize: 28,
                    paddingRight: 60,
                    fontWeight: 800,
                    color: "black",
                  }}
                >
                  Collection Data
                </Text>
                <Entypo
                  name="cross"
                  size={32}
                  color={colors.iconColor}
                  onPress={props.onHide}
                />
              </View>
              <Divider
                color="grey"
                width={2}
                style={{ marginBottom: 12, marginTop: -8 }}
              />
              <View style={{ gap: 13 }}>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Process Name:</Text>{" "}
                  {collectionData.portfolio}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Loan No:</Text>{" "}
                  {collectionData.loancardaccountno}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Customer Name:</Text>{" "}
                  {collectionData.customername}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>
                    Principal Outstanding:{" "}
                  </Text>
                  {collectionData.principaloutstanding}
                </Text>
                {/* <Text><Text style={{fontWeight:700}}>EMI:</Text>{collectionData.emi}</Text> */}
                <Text>
                  <Text style={{ fontWeight: 700 }}>EMI Date:</Text>{" "}
                  {collectionData.emidate}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>No of EMI:</Text>
                  {collectionData.noofemi}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Total Due :</Text>
                  {collectionData.totaldue}
                </Text>
                {/* <Text><Text style={{fontWeight:700}}>Cycle_BKT:</Text>{collectionData.cycleBkt}</Text> */}
                <Text>
                  <Text style={{ fontWeight: 700 }}>Mobile No:</Text>{" "}
                  {collectionData.mobileno}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Pickup Add1:</Text>{" "}
                  {collectionData.pickupaddress1}
                </Text>
                {/* <Text><Text style={{fontWeight:700}}>Pickup Add2:</Text>{collectionData.pickupAdd2}</Text> */}
                {/* <Text><Text style={{fontWeight:700}}>Pickup Add3:</Text>{collectionData.pickupAdd3}</Text> */}
                {/* <Text><Text style={{fontWeight:700}}>Status:</Text>{collectionData.status}</Text> */}
                {/* <Text><Text style={{fontWeight:700}}>Disposition:</Text>{collectionData.disposition}</Text> */}
                {/* <Text><Text style={{fontWeight:700}}>Pickup Timing:</Text>{collectionData.pickupTiming}</Text> */}
                <Divider color="grey" style={{ marginVertical: 10 }} />
              </View>
              <Pressable style={styles.button} onPress={handleTraced}>
                <Text style={styles.textStyle}>TRACED</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleUntracable}>
                <Text style={styles.textStyle}>UNTRACEABLE</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.textStyle}>WRONG ALLOCATED</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          Loading...
        </Text>
      </View>
    );
  }
};

export default CollectionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: -55,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    padding: 10,
    margin: 5,
    elevation: 2,
    width: 300,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
