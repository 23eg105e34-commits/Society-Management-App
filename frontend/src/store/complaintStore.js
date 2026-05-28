import { create }
from "zustand";

import API
from "../api/axios";



export const useComplaintStore =
create((set) => ({

  complaints: [],

  error: null,




  // GET COMPLAINTS
  getComplaints:
  async () => {

    try {

      const response =
        await API.get(
          "/complaints"
        );



      set({

        complaints:
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




  // ADD COMPLAINT
  addComplaint:
  async (
    complaintObj
  ) => {

    try {

      await API.post(

        "/complaints",

        complaintObj
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },




  // UPDATE STATUS
  updateStatus:
  async (

    id,
    status

  ) => {

    try {

      await API.put(

        `/complaints/${id}`,

        { status }
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  }

}));