import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useAuth } from "../store/authStore";

import {
  FaBuilding,
  FaRocket,
  FaBell,
  FaClipboardCheck
} from "react-icons/fa";


function Register() {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit
  } = useForm();



  // REGISTER FUNCTION
  const registerUser =
    useAuth(
      (state) =>
        state.registerUser
    );



  // REGISTER
  const onRegister =
    async (userObj) => {

      try {

        await registerUser(
          userObj
        );



        toast.success(
          "Registration Successful"
        );



        navigate("/");

      } catch (err) {

        console.log(err);

        console.log(
          err.response?.data
        );



        toast.error(
          err.response?.data?.message ||
          "Registration Failed"
        );
      }
    };




  return (

    <div className="min-h-screen flex bg-slate-950">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden items-center justify-center">

        {/* GLOW EFFECTS */}
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full top-10 left-10 blur-3xl"></div>

        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full bottom-10 right-10 blur-3xl"></div>



        {/* CONTENT */}
        <motion.div

          initial={{
            opacity: 0,
            x: -50
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.8
          }}

          className="text-white z-10 px-16"
        >

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-xl border border-white/20">

              <FaBuilding className="text-5xl text-cyan-400" />

            </div>



            <h1 className="text-5xl font-bold leading-tight">

              Join Your
              <br />
              Community

            </h1>

          </div>



          <p className="text-xl text-gray-300 leading-relaxed mb-10">

            Experience next-generation
            society management with
            real-time notifications,
            visitor monitoring and
            smart facility booking.

          </p>



          {/* FEATURES */}
          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaRocket className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Quick Community Setup
              </p>

            </div>



            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaBell className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Real-time Notifications
              </p>

            </div>



            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaClipboardCheck className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Easy Complaint Management
              </p>

            </div>

          </div>

        </motion.div>

      </div>





      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950">

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}

          className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10"
        >

          <div className="text-center mb-8">

            <h2 className="text-4xl font-bold text-white mb-2">

              Create Account

            </h2>



            <p className="text-gray-300">

              Create your smart society account

            </p>

          </div>





          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onRegister
            )}
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label className="text-sm font-semibold text-gray-300 block mb-2">

                Full Name

              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all"
              />

            </div>





            {/* EMAIL */}
            <div>

              <label className="text-sm font-semibold text-gray-300 block mb-2">

                Email

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all"
              />

            </div>





            {/* PASSWORD */}
            <div>

              <label className="text-sm font-semibold text-gray-300 block mb-2">

                Password

              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all"
              />

            </div>





            {/* ROLE */}
            <div>

              <label className="text-sm font-semibold text-gray-300 block mb-2">

                Role

              </label>

              <select
                {...register("role")}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all"
              >

                <option
                  value=""
                  className="text-black"
                >
                  Select Role
                </option>

                <option
                  value="RESIDENT"
                  className="text-black"
                >
                  Resident
                </option>

                <option
                  value="OWNER"
                  className="text-black"
                >
                  Owner
                </option>

              </select>

            </div>





            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-2xl font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
            >

              Create Account

            </button>

          </form>





          {/* LOGIN LINK */}
          <p className="text-center text-gray-400 mt-8">

            Already have an account?

            <Link
              to="/"
              className="text-cyan-400 font-semibold ml-2 hover:underline"
            >

              Login

            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Register;