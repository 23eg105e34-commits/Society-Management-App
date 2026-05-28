import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Facilities from "./pages/Facilities";
import Payments from "./pages/Payments";
import Notices from "./pages/Notices";
import Complaints from "./pages/Complaints";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

import { useThemeStore } from "./store/themeStore";


function App() {

  // THEME
  const darkMode =
    useThemeStore(
      (state) =>
        state.darkMode
    );


  return (

    <div className={darkMode ? "dark" : ""}>

      <BrowserRouter>

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />



          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />



          <Route
            path="/visitors"
            element={
              <ProtectedRoute>
                <Visitors />
              </ProtectedRoute>
            }
          />



          <Route
            path="/facilities"
            element={
              <ProtectedRoute>
                <Facilities />
              </ProtectedRoute>
            }
          />



          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />



          <Route
            path="/notices"
            element={
              <ProtectedRoute>
                <Notices />
              </ProtectedRoute>
            }
          />



          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />



          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;