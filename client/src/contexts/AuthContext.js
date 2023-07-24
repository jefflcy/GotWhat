import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem("token") || Cookies.get("token");
      try {
        // Make a GET request to backend to check storedToken validity
        const { data } = await axios.get(`${backendUrl}/isValidToken`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (data.valid) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // catching axios error here means storedToken is invalid/missing
        //console.log(error);
      }
    };

    checkTokenValidity();
  }, [backendUrl]);

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    Cookies.remove("token");
  };

  const authContextValue = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
