import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import CollectionData from "./app/collections/CollectionData";
import React from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./app/screens/Profile";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "./utils/colors";
const Drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();

const LogoutButton = () => {
  const { onLogout } = useAuth();

  // Perform the logout action directly
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const Root = () => {
  const { onLogout } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <DrawerItem label="Logout" onPress={() => onLogout()} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Off Shoot"
        component={BottomTab}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons
              name="person-circle"
              size={40}
              color={colors.iconColor}
              style={{marginRight:25}}
              onPress={() => navigation.navigate("Profile")}
            />
          ),
        })}
      />
      <Drawer.Screen name="CollectionData" component={CollectionData} />
    </Drawer.Navigator>
  );
};

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
    activeColor="#2196F3"
    labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#fff' }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Collection Data " component={CollectionData}
      options={{
        tabBarLabel: 'Collection Data',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="database" color={color} size={26} />
        ),
      }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <stack.Navigator>
        {authState?.authenticated ? (
          <React.Fragment>
            <stack.Screen
              name="Root"
              component={Root}
              options={{ headerShown: false }}
            />
            <stack.Screen name="Profile" component={Profile}></stack.Screen>
            <stack.Screen
              name="bottom Drawer"
              component={BottomTab}
            ></stack.Screen>
            <stack.Screen
              name="CollectionData"
              component={CollectionData}
              options={{
                headerRight: () => <LogoutButton />,
              }}
            />
          </React.Fragment>
        ) : (
          <stack.Screen name="Login" component={Login} />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
