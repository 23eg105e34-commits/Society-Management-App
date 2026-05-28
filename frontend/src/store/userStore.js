import { create }
from "zustand";

import API
from "../api/axios";


export const useUserStore =
create((set) => ({

  residents: [],

  error: null,


  // GET RESIDENTS
  getResidents: async () => {

    try {

      const response =
        await API.get(
          "/users/residents"
        );

      set({

        residents:
          response.data,

        error: null
      });

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  }

}));