import { useEffect } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaMoneyBillWave,
  FaBuilding,
  FaUserFriends,
  FaClipboardList,
  FaBell,
  FaDoorOpen,
  FaChartLine,
  FaSignOutAlt,
  FaUserCircle,
  FaMoon,
  FaSun
} from "react-icons/fa";

import { useAuth } from "../store/authStore";

import { useDashboardStore } from "../store/dashboardStore";

import { useThemeStore } from "../store/themeStore";

import NotificationBell from "../components/NotificationBell";

import AnalyticsChart from "../components/AnalyticsChart";

import socket from "../socket";


function Dashboard() {

  const navigate = useNavigate();


  const currentUser =
    useAuth(
      (state) =>
        state.currentUser
    );


  const logout =
    useAuth(
      (state) =>
        state.logout
    );


  // THEME
  const darkMode =
    useThemeStore(
      (state) =>
        state.darkMode
    );

  const toggleTheme =
    useThemeStore(
      (state) =>
        state.toggleTheme
    );



  // DASHBOARD STATS
  const stats =
    useDashboardStore(
      (state) =>
        state.stats
    );


  const getStats =
    useDashboardStore(
      (state) =>
        state.getStats
    );




  // SOCKET + LIVE UPDATE
  useEffect(() => {

    socket.on(

      "connect",

      () => {

        console.log(
          "Connected to socket server"
        );
      }
    );



    socket.on(

      "new_notice",

      (data) => {

        console.log(
          "New Notice Received:",
          data
        );
      }
    );



    socket.on(

      "dashboard_update",

      () => {

        getStats();
      }
    );



    if (
      currentUser?.role ===
      "OWNER"
    ) {

      getStats();
    }



    return () => {

      socket.off(
        "connect"
      );

      socket.off(
        "new_notice"
      );

      socket.off(
        "dashboard_update"
      );
    };

  }, [currentUser]);







  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/");
  };










  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-black dark:text-white overflow-hidden relative transition-all duration-500">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>









      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/40 dark:bg-white/5 border-b border-white/10 px-8 py-5 flex justify-between items-center">

        {/* LOGO */}
        <div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            SocietySphere

          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">

            Smart Society Management

          </p>

        </div>








        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* THEME TOGGLE */}
          



          {/* NOTIFICATION */}
          <NotificationBell />



          {/* PROFILE DROPDOWN */}
          <div className="relative group">

            {/* BUTTON */}
            <button
              className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >

              <FaUserCircle className="text-2xl" />

              <div className="text-left">

                <p className="text-xs text-cyan-100">

                  Welcome

                </p>

                <h3>

                  {currentUser?.name}

                </h3>

              </div>

            </button>






            {/* DROPDOWN */}
            <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

              {/* PROFILE */}
              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-black dark:text-white"
              >

                <FaUserCircle className="text-cyan-500" />

                Profile

              </button>





              {/* SETTINGS */}
              <button
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-black dark:text-white"
              >

                ⚙️

                Settings

              </button>






              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-500 hover:text-white transition-all text-red-500"
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          </div>

        </div>

      </div>





      {/* MAIN CONTENT */}
      <div className="p-6 md:p-10 relative z-10">

        {/* WELCOME CARD */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="bg-white/40 dark:bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 mb-10 shadow-2xl"
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h2 className="text-5xl font-bold mb-4">

                Welcome,
                {" "}

                <span className="text-cyan-400">

                  {currentUser?.name || "User"}

                </span>

              </h2>



              <p className="text-gray-700 dark:text-gray-300 text-lg">

                Manage your society with real-time analytics,
                visitors, facilities, complaints and payments.

              </p>

            </div>






            <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-5 rounded-3xl">

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">

                Logged in as

              </p>

              <h3 className="text-2xl font-bold text-cyan-400">

                {currentUser?.role}

              </h3>

            </div>

          </div>

        </motion.div>








        {/* RESIDENT DASHBOARD */}
        {currentUser?.role ===
          "RESIDENT" && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <DashboardCard
              title="Visitors"
              description="Manage society visitors"
              icon={<FaUserFriends />}
              color="from-cyan-500 to-blue-600"
              onClick={() =>
                navigate("/visitors")
              }
            />



            <DashboardCard
              title="Facilities"
              description="Book society facilities"
              icon={<FaBuilding />}
              color="from-green-500 to-emerald-600"
              onClick={() =>
                navigate("/facilities")
              }
            />



            <DashboardCard
              title="Payments"
              description="Pay maintenance bills"
              icon={<FaMoneyBillWave />}
              color="from-purple-500 to-indigo-600"
              onClick={() =>
                navigate("/payments")
              }
            />



            <DashboardCard
              title="Notices"
              description="View society notices"
              icon={<FaBell />}
              color="from-orange-500 to-red-500"
              onClick={() =>
                navigate("/notices")
              }
            />



            <DashboardCard
              title="Complaints"
              description="Raise complaints easily"
              icon={<FaClipboardList />}
              color="from-pink-500 to-rose-600"
              onClick={() =>
                navigate("/complaints")
              }
            />

          </div>

        )}








        {/* OWNER DASHBOARD */}
        {currentUser?.role ===
          "OWNER" && (

          <>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

              <StatsCard
                title="Residents"
                value={stats?.totalResidents || 0}
                icon={<FaUsers />}
                color="from-cyan-500 to-blue-600"
              />



              <StatsCard
                title="Pending Payments"
                value={stats?.pendingPayments || 0}
                icon={<FaMoneyBillWave />}
                color="from-red-500 to-pink-600"
              />



              <StatsCard
                title="Paid Payments"
                value={stats?.paidPayments || 0}
                icon={<FaChartLine />}
                color="from-green-500 to-emerald-600"
              />



              <StatsCard
                title="Facilities"
                value={stats?.pendingFacilities || 0}
                icon={<FaBuilding />}
                color="from-yellow-400 to-orange-500"
              />



              <StatsCard
                title="Visitors"
                value={stats?.totalVisitors || 0}
                icon={<FaDoorOpen />}
                color="from-purple-500 to-indigo-600"
              />

            </div>






            {/* ANALYTICS */}
            <div className="bg-white/40 dark:bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 mb-10 shadow-2xl">

              <div className="flex items-center gap-3 mb-6">

                <FaChartLine className="text-cyan-400 text-2xl" />

                <h2 className="text-3xl font-bold">

                  Analytics Overview

                </h2>

              </div>



              <AnalyticsChart

                paidPayments={
                  stats?.paidPayments || 0
                }

                pendingPayments={
                  stats?.pendingPayments || 0
                }

              />

            </div>






            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

              <DashboardCard
                title="Notices"
                description="Manage notices"
                icon={<FaBell />}
                color="from-orange-500 to-red-500"
                onClick={() =>
                  navigate("/notices")
                }
              />



              <DashboardCard
                title="Payments"
                description="Manage payments"
                icon={<FaMoneyBillWave />}
                color="from-purple-500 to-indigo-600"
                onClick={() =>
                  navigate("/payments")
                }
              />



              <DashboardCard
                title="Facilities"
                description="Approve facilities"
                icon={<FaBuilding />}
                color="from-green-500 to-emerald-600"
                onClick={() =>
                  navigate("/facilities")
                }
              />



              <DashboardCard
                title="Visitors"
                description="Monitor visitors"
                icon={<FaUserFriends />}
                color="from-cyan-500 to-blue-600"
                onClick={() =>
                  navigate("/visitors")
                }
              />



              <DashboardCard
                title="Complaints"
                description="Resolve complaints"
                icon={<FaClipboardList />}
                color="from-pink-500 to-rose-600"
                onClick={() =>
                  navigate("/complaints")
                }
              />

            </div>

          </>

        )}

      </div>

    </div>
  );
}










// STATS CARD
function StatsCard({
  title,
  value,
  icon,
  color
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03
      }}

      className={`bg-gradient-to-br ${color} rounded-[28px] p-6 shadow-2xl`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/80">

            {title}

          </p>



          <h2 className="text-5xl font-bold text-white mt-3">

            {value}

          </h2>

        </div>



        <div className="text-5xl text-white/80">

          {icon}

        </div>

      </div>

    </motion.div>

  );
}










// DASHBOARD CARD
function DashboardCard({
  title,
  description,
  icon,
  color,
  onClick
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03,
        y: -5
      }}

      whileTap={{
        scale: 0.98
      }}

      onClick={onClick}

      className={`bg-gradient-to-br ${color} p-7 rounded-[30px] shadow-2xl cursor-pointer relative overflow-hidden`}
    >

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>



      <div className="relative z-10">

        <div className="text-5xl text-white/90 mb-6">

          {icon}

        </div>



        <h2 className="text-3xl font-bold text-white mb-3">

          {title}

        </h2>



        <p className="text-white/80 text-lg">

          {description}

        </p>

      </div>

    </motion.div>

  );
}

export default Dashboard;