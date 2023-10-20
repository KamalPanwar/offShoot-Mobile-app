import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const AuthProps = {
  authState: { token: null, authenticated: null },
  onRegister: (email, password) => Promise.resolve(),
  onLogin: (email, password) => Promise.resolve(),
  onLogout: () => Promise.resolve(),
};

const TOKEN_KEY = "MY_JWT";
export const API_URL = 'http://192.168.29.152:3000';
const AuthContext = createContext(AuthProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("line 32 authcontext useEffect"+ token);

      if (token) {
           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         setAuthState({
          token: token,
          authenticated: true,
        });
      }
      } catch (error) {
        console.log(error)
      }
    };
    loadToken();
  }, []);

  const register = async (email, password) => {
  
    try {
      return await axios.post(`${API_URL}/signup`, { email:email, password:password });
    } catch (error) {
      return { error: true, error: error };
    }
  };

 const login = async (email, password) => {
  try {

    const response = await axios.post(`${API_URL}/login`, { email:email, password:password });
    console.log("file:Authcontext line 32-login", response);
    setAuthState({
      token: response.data.token,
      authenticated: true,
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    console.log("file:Authcontext line 70-login", error);
    return { error: true, errorMessage: error.message };
  }
};

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "_";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
