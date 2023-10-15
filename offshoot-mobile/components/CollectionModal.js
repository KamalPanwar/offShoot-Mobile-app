import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { colors } from "../utils/colors";

const coleectionData = {
  processName: "IDFC Collection",
  loanNo: 6584514,
  customerName: "Anuj Bhati",
  principalOutstanding: 126985,
  emi: 12654,
  emiDate: Date("2023/07/23"),
  noofEmi: 0,
  totalDue: 123654,
  cycleBkt: 0,
  mobileNo: 989845698,
  pickupAdd1:
    "C 4 204 Aparnaraj Chs Gholani Nagar Kharegaon Kalwa West Thane Maharasthra 400605 Mumbai Thane 400605",
  pickupAdd2: "Mumbai",
  pickupAdd3: "Thane",
  status: "N/A",
  disposition: "N/A",
  pickupTiming: "12:30",
};

const CollectionModal = (props) => {
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
            <Text style={{fontSize:28,paddingRight:60,fontWeight:800,color:'black'}}>Collection Data</Text>
            <Entypo name="cross" size={32} color={colors.iconColor} onPress={props.onHide} />
            </View>
            
            <View>
            <Text> Process Name: {coleectionData.processName}</Text>
            <Text> Loan No:{coleectionData.loanNo}</Text>
            <Text> Customer Name: {coleectionData.customerName}</Text>
            <Text>
              Principal Outstanding: {coleectionData.principalOutstanding}
            </Text>
            <Text> EMI:{coleectionData.emi}</Text>
            <Text> EMI Date:{coleectionData.emiDate}</Text>
            <Text>Noof EMI:{coleectionData.noofEmi}</Text>
            <Text>Total Due :{coleectionData.totalDue}</Text>
            <Text>Cycle_BKT:{coleectionData.cycleBkt}</Text>
            <Text> Mobile No:{coleectionData.mobileNo}</Text>
            <Text>Pickup Add1: {coleectionData.pickupAdd1}</Text>
            <Text>Pickup Add2:{coleectionData.pickupAdd2}</Text>
            <Text> Pickup Add3:{coleectionData.pickupAdd3}</Text>
            <Text>Status:{coleectionData.status}</Text>
            <Text>Disposition:{coleectionData.disposition}</Text>
            <Text>Pickup Timing:{coleectionData.pickupTiming}</Text>
            </View>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollectionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 17,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  modalHeader:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    textAlign:'center',
    marginBottom:20,
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
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
