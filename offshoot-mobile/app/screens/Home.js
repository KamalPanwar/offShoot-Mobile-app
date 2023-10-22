import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

const Home = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    (async () => {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundStatus === "granted") {
        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <View style={styles.welcome}>
        <View style={styles.welcomeBg} />
        <View style={styles.welcomeMain}>
          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.base} bounces={false}>
              <View style={styles.welcomeCtn}>
                <View style={styles.welcomeTop}>
                  <Image
                    style={styles.welcomeLogo}
                    source={{
                      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAq1BMVEX///8AAADxdQDyewDxeADxcgC7u7vx8fHxcABKSkr//Pr+8en8/PzwbQDyfQD5xqn96Nvq6urzhio4NzjOzc5XV1f0mlfj4+OKiYqhoKFTUlPZ2dmysrL0lU3+9/GBgIFpaGmZmJn5wp76z7TwZwAtLC31oWbEw8QUExT4uJF3dnc/Pz/84M7607/0kUTygBz2p3LvXQD2pXn3spL2rnzzjDj3vJ/2roQdGx3+0KDIAAAFTUlEQVRoge2Xa3eiOhRAEx6CiEgQ5P20gCiiM9Xa///L7knw0dpOi3Nn7rofsteqTRDYOecEEhHicDgcDofD4XA4HA6Hw+FwOBzO/xctuetPzgeSyfsv9D+uXnY/BOGHNbsd2f9cPEkmQm38rD7tr2bbn5d/WJ906mGiaclJti5xVhX8PRXIlFpkCtLlsOJv8PjP2ieGXPStpSyarGFO4UiyTFBlgLhtbyePBtpJOEyuddLi0t6LR1btRu6LoO2su6oPtaf1MPtMEK6xmbLA0lAJvX1iWHeTcaC9xvYwe2eot45kdBqavRzF6uVlmzyfjF3z8qwhFI7LsZ/3dmRnr8755nU2X2WXMEfQSekXiodxmkcDhmnujOOttxCh8svZUdzPijYpGmNXzIoEQql1MsfMHuRO6mBM66qvS1dXMpxRjx4EhJ7kwVjzEnt+NCD0VhKrW+8kCls6iHPmTZFlXg9e4dPt7ZjelUmQx/Krj3EK/zKs0LBX2IfP+cDMt4K4v/WaD3Y665SS3TlAfeaBHDt0OAE7K8KYIJuNh45opT9k/zJ2atcdXEKmFXSddT6153jNzlIwxLumMQM2xvVwu2mIi1uvEqX2ox2FGGPHRXf2jGX8nPoA93UmJTQG25OjId56hsF093YUbjBmwb21Bzjrr4Jh6Buc94nYPGJHB0m9PtOJ2pfhgx3p/itN6V3swcXuw1D6usMwHsg8GKTi0i4kyfzErtCkugEt81u7j0vChAF2oe4b9nwTOkOH29FsKp6Dn0hqgz6xExYjwdl7O8F4xOy0A1ODTYyQToYH7KDfsYhbcdrL0ULqG61o0G+Ukgav0HnlY/row3QP2BheddahKfDoGKAKpcLS76No4ELTxmrcNN202/YpeFFVecsW9+l0v00QWeHUrjcZUkZQ/TRU4J2Dcwg1Ws1tO533Gg9ntu0ErBgpnJAOXYo1c3Y6zUyt701MoIWUm6yRID10o9SDXCohxdVt+o9qlFHq1cr5Lq4PJ/VK3fcGLnIPo/UkkytJwo78JR88i2a7LJrn076KO2snCrJ6ZdqjSsbuGFf703Ox3JrJ97cc4Nwui8PCEqaqLAhSjyAIMpXLgrizrGMXxwtKxT7juOuO1k4SppJVPc+2k+8lH5mYbXHodjtDlCQRkARZMKxuUf08nIrlsjUh2+cCfMz3pTIJrc2D4U7aoootQ5CYlDrj6lBse+HvRDIUrW32nSgzL1TRWjQ0yr+qvLBtYqEXy6q1n23N/8RKaZvjVKBi1aiaZV8rPf/qCj169bLL3om9YpGSzUeXnhJ8efWNpN3vRAkiNhaH5Zs0j9j7U2HbJZ3+fqItAg0doBsbu4bNHW1H/b4C5a/0FJdufvTMG6DW2sORPkVQ4vauwOkKbjpaR2Pb9j0SBd4mRJ4fkE2ue709wqGTIs+GNyy7wmOveNjk6I4//96eFLEMc9tq2o8PRk3WsJ6sfNhLrkIvt1dkHNljkuqeQ6jMxV4ewgKDIjQ+V4DZ4d2PfAd9G/vkBG8seb/8/JFMIw+2Cf46chCOQlKXYI9KFjRdX2jsiK57qa5v3tpDsK+z7+xm9TQ9Nu2vvg5hkXBWqB6BaZO5YU1jd7FvE+RkiNnZMrJOYTn1SUlL760UFNURJlGpjFOCf7nCTvbTrvnimdJz2JzlXpjDSumSdY5Gnp378NMFZnXNNvEjz6fLWQijs2nxYUbmnu+nRIF2nueRkpLP763N4sOwxzmr3fT9bxKyvq6ov0dSbIe+SexodLdO6+nALcsv7f/ucg6Hw+FwOBwOh8PhcDgcDofD4XAe5R83C3YD5vy2PQAAAABJRU5ErkJggg==",
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.welcomeText}>Welcome!</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  welcome: {
    flex: 1,
  },
  welcomeBg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
  },
  welcomeMain: {
    flex: 1,
  },
  welcomeCtn: {
    flexGrow: 1,
  },
  welcomeTop: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  welcomeLogo: {
    width: 400,
    height: 205,
  },
  welcomeText: {
    marginTop: 24,
    fontSize: 22,

    fontWeight: "bold",
  },
});

export default Home;
