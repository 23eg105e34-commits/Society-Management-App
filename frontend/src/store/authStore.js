import { create } from "zustand";

import API from "../api/axios";

export const useAuth = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  error: null,

  // LOGIN
  login: async (userCredObj) => {

    try {

      const response = await API.post("/auth/login", userCredObj);

      // store token
      localStorage.setItem(
        "token",
        response.data.token
      );

      set({
        currentUser: response.data.user,
        isAuthenticated: true,
        error: null
      });

    } catch (err) {

      set({
        error:
          err.response?.data?.message ||
          "Login Failed"
      });
    }
  },
  // REGISTER
  registerUser: async (userObj) => {
    try {
      await API.post(
        "/auth/register",
        userObj
      );
      set({
        error: null
      });
    } 
    catch (err) {
      set({
        error:
          err.response?.data?.message ||
          "Registration Failed"
      });
    }
  },
  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    set({currentUser: null,isAuthenticated: false});
}
}));