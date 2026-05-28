import { create }
from "zustand";

import API
from "../api/axios";


export const useProfileStore =
create((set) => ({

  profile: null,



  // GET PROFILE
  getProfile: async () => {

    try {

      const response =
        await API.get(
          "/profile"
        );



      set({

        profile:
          response.data
      });

    } catch (err) {

      console.log(err);
    }
  },





  // UPDATE PROFILE
  updateProfile:
  async (profileObj) => {

    try {

      const response =
        await API.put(

          "/profile/update",

          profileObj
        );



      set({

        profile:
          response.data.user
      });

    } catch (err) {

      console.log(err);
    }
  },






  // CHANGE PASSWORD
  changePassword:
  async (passwordObj) => {

    try {

      await API.put(

        "/profile/change-password",

        passwordObj
      );

    } catch (err) {

      console.log(err);
    }
  }

}));