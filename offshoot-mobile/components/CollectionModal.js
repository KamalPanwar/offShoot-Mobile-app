import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { colors } from "../utils/colors";
import { Divider } from "@rneui/base";




const coleectionData = {
  processName: "IDFC Collection",
  loanNo: 6584514,
  customerName: "Anuj Bhati",
  principalOutstanding: 126985,
  emi: 12654,
  emiDate: "2023/07/23",
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
            <Divider color="grey" width={2} style={{marginBottom:12,marginTop:-8}}  />
          
            <Text><Text style={styles.options}>Process Name:</Text> {coleectionData.processName}</Text>
            <Text><Text style={{fontWeight:700}}>Loan No:</Text> {coleectionData.loanNo}</Text>
            <Text><Text style={{fontWeight:700}}>Customer Name:</Text> {coleectionData.customerName}</Text>
            <Text><Text style={{fontWeight:700}}>Principal Outstanding: </Text>{coleectionData.principalOutstanding}</Text>
            <Text><Text style={{fontWeight:700}}>EMI:</Text>{coleectionData.emi}</Text>
            <Text><Text style={{fontWeight:700}}>EMI Date:</Text> {coleectionData.emiDate}</Text>
            <Text><Text style={{fontWeight:700}}>Noof EMI:</Text>{coleectionData.noofEmi}</Text>
            <Text><Text style={{fontWeight:700}}>Total Due :</Text>{coleectionData.totalDue}</Text>
            <Text><Text style={{fontWeight:700}}>Cycle_BKT:</Text>{coleectionData.cycleBkt}</Text>
            <Text><Text style={{fontWeight:700}}>Mobile No:</Text> {coleectionData.mobileNo}</Text>
            <Text><Text style={{fontWeight:700}}>Pickup Add1:</Text> {coleectionData.pickupAdd1}</Text>
            <Text><Text style={{fontWeight:700}}>Pickup Add2:</Text>{coleectionData.pickupAdd2}</Text>
            <Text><Text style={{fontWeight:700}}>Pickup Add3:</Text>{coleectionData.pickupAdd3}</Text>
            <Text><Text style={{fontWeight:700}}>Status:</Text>{coleectionData.status}</Text>
            <Text><Text style={{fontWeight:700}}>Disposition:</Text>{coleectionData.disposition}</Text>
            <Text><Text style={{fontWeight:700}}>Pickup Timing:</Text>{coleectionData.pickupTiming}</Text>
            <Divider color="grey" style={{marginVertical:10}}  />
            </View>
            <Pressable
              style={styles.button}
              
              >
              <Text style={styles.textStyle}>TRACED</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              
              >
              <Text style={styles.textStyle}>UNTRACEABLE</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              
              >
              <Text style={styles.textStyle}>WRONG ALLOCATED</Text>
            </Pressable>
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
    marginTop:-55,
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
  options:{
    fontWeight:700,
    
  },
  modalHeader:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    textAlign:'center',
    marginBottom:20,
    
  },
  
  button: {
    borderRadius: 10,
    backgroundColor:colors.lightBlue,
    padding: 10,
    margin:5,
    elevation: 2,
    width:300

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
