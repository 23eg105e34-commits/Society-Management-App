import { create }
from "zustand";

import API
from "../api/axios";


export const useNoticeStore =
create((set) => ({

  notices: [],

  error: null,


  // GET NOTICES
  getNotices: async () => {

    try {

      const response =
        await API.get(
          "/notices"
        );

      set({

        notices:
          response.data,

        error: null
      });

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // ADD NOTICE
  addNotice: async (
    noticeObj
  ) => {

    try {

      await API.post(

        "/notices",

        noticeObj
      );

    } catch (err) {

      console.log(
        err.response?.data
      );

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // MARK NOTIFICATIONS AS READ
  markAsRead: async () => {

    try {

      await API.put(
        "/notices/read"
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // DELETE NOTICE
  deleteNotice: async (
    id
  ) => {

    try {

      await API.delete(

        `/notices/${id}`
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  }

}));