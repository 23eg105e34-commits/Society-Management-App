import { create }
from "zustand";

import API
from "../api/axios";


export const useDashboardStore =
create((set) => ({

  stats: null,

  error: null,


  // GET DASHBOARD STATS
  getStats: async () => {

    try {

      const response =
        await API.get(
          "/dashboard/stats"
        );

      set({

        stats:
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