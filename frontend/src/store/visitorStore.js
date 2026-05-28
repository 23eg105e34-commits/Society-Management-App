import { create } from "zustand";

import API from "../api/axios";


export const useVisitorStore = create((set) => ({

  visitors: [],

  error: null,


  // GET VISITORS
  getVisitors: async () => {

    try {

      const response = await API.get(
        "/visitors"
      );

      set({
        visitors: response.data,
        error: null
      });

    } catch (err) {

      set({
        error:
          err.response?.data?.message
      });
    }
  },

  // ADD VISITOR
  addVisitor: async (visitorObj) => {
    try {

      await API.post(
        "/visitors",
        visitorObj
      );
    } catch (err) {

      set({
        error:
          err.response?.data?.message
      });
    }
  },

  // MARK EXIT
  markExit: async (id) => {

    try {

      await API.put(
        `/visitors/${id}/exit`
      );

    } catch (err) {

      set({
        error:
          err.response?.data?.message
      });
    }
  }

}));