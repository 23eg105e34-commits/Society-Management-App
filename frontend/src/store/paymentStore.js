import { create } from "zustand";

import API from "../api/axios";


export const usePaymentStore = create((set) => ({

  payments: [],

  error: null,


  // GET PAYMENTS
  getPayments: async () => {

    try {

      const response = await API.get(
        "/payments"
      );

      set({

        payments: response.data,

        error: null
      });

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // OWNER CREATES BILL
  addPayment: async (paymentObj) => {

    try {

      await API.post(

        "/payments",

        paymentObj
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  },



  // RESIDENT PAYS BILL
  payPayment: async (id) => {

    try {

      await API.put(

        `/payments/${id}/pay`
      );

    } catch (err) {

      set({

        error:
          err.response?.data?.message
      });
    }
  }

}));