import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { fontSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";


export default function Login({ navigation }) {
  const { onLogin, onRegister } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async(data) =>{
    const {email}=data
    const {password}=data
    const result = await onLogin(email, password);
    if (result && result.error) {
      alert('Wrong id or password');
    }
   
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainIconWrapper}>
        <View style={styles.iconWrapper}>
          <AntDesign name="login" size={28} color="black" />
        </View>
      </View>
      <Text style={styles.header}>Sign In With Agent ID</Text>
      <View>
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
          name="email"
        />
        {errors.userId && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.forgotTextWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
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
    fontSize: fontSizes.lg,
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
  forgotTextWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotText: {
    color: "orange",
    fontSize: fontSizes.md,
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
