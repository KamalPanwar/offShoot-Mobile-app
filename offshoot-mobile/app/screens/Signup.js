import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,

  StatusBar,
  Platform,
  TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { fontSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      userId: "",
      password: "",
    },
  });

  const onSubmit = async(data) =>{
    console.log(data);
    const email= data.userId
    const {password}=data
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.error);
    } else {
      login();
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainIconWrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name="person-add" size={28} color="black" />
        </View>
      </View>
      <Text style={styles.header}>Sign Up</Text>

      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userName"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="UserID"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userId"
        />
        {errors.userId && (
          <Text style={styles.errorText}>This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.lg,
              fontWeight: 500,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    }),
  },
  mainIconWrapper: {
    flex: 0.3,
    paddingTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  header: {
    flex: 0.1,
    color: "black",
    fontSize: fontSizes.xl,
    textAlign: "center",
    fontWeight: "700",
   
  },

  input: {
    height: 40,
    margin: 8,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },

  buttonWrapper: {
    marginTop: 40,
    height: 50,
  },
  submitButton: {
    flex: 1,
    height: 50,
    backgroundColor: colors.darkBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
