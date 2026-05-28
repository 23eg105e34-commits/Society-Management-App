import { create }
from "zustand";

export const useThemeStore =
  create((set) => ({

    darkMode:

      localStorage.getItem(
        "theme"
      ) === "dark",



    toggleTheme: () =>

      set((state) => {

        const newTheme =
          !state.darkMode;

        localStorage.setItem(

          "theme",

          newTheme
            ? "dark"
            : "light"
        );

        return {
          darkMode: newTheme
        };
      })
}));