import { create }
from "zustand";

import API
from "../api/axios";


export const useFacilityStore =
create((set) => ({

  bookings: [],

  error: null,


  // GET BOOKINGS
  getBookings: async () => {

    try {

      const response =
        await API.get(
          "/facilities"
        );

      set({

        bookings:
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



  // RESIDENT REQUESTS FACILITY
  bookFacility: async (
    bookingObj
  ) => {

    try {

      await API.post(

        "/facilities",

        bookingObj
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // OWNER APPROVES BOOKING
  approveBooking: async (
    id
  ) => {

    try {

      await API.put(

        `/facilities/${id}/approve`
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // OWNER REJECTS BOOKING
  rejectBooking: async (
    id
  ) => {

    try {

      await API.put(

        `/facilities/${id}/reject`
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  }

}));