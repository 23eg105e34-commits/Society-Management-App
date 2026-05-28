import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useAuth } from "../store/authStore";

import {
  FaBuilding,
  FaUserShield,
  FaUsers
} from "react-icons/fa";


function Login() {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit
  } = useForm();



  const login =
    useAuth(
      (state) =>
        state.login
    );



  // LOGIN
  const onLogin =
    async (userObj) => {

      try {

        await login(
          userObj
        );



        toast.success(
          "Login Successful"
        );



        navigate(
          "/dashboard"
        );

      } catch (err) {

        console.log(err);

        toast.error(
          "Login Failed"
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

              Society
              <br />
              Management

            </h1>

          </div>



          <p className="text-xl text-gray-300 leading-relaxed mb-10">

            Modern smart society management
            platform with real-time monitoring,
            visitor tracking and secure management.

          </p>



          {/* FEATURES */}
          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaUsers className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Manage Residents Easily
              </p>

            </div>



            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaUserShield className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Secure Visitor Tracking
              </p>

            </div>



            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">

                <FaBuilding className="text-2xl text-cyan-400" />

              </div>

              <p className="text-lg">
                Facility & Payment Management
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

              Welcome Back

            </h2>



            <p className="text-gray-300">

              Login to continue

            </p>

          </div>





          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onLogin
            )}
            className="space-y-5"
          >

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





            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-2xl font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
            >

              Login

            </button>

          </form>





          {/* REGISTER LINK */}
          <p className="text-center text-gray-400 mt-8">

            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 font-semibold ml-2 hover:underline"
            >

              Register

            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;