import { useEffect }
from "react";

import { motion }
from "framer-motion";

import { useForm }
from "react-hook-form";

import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import {
  FaArrowLeft,
  FaUserCircle,
  FaLock,
  FaSave
}
from "react-icons/fa";

import { useProfileStore }
from "../store/profileStore";


function Profile() {

  const navigate =
    useNavigate();



  const {
    register,
    handleSubmit,
    reset
  } = useForm();



  const profile =
    useProfileStore(
      (state) =>
        state.profile
    );



  const getProfile =
    useProfileStore(
      (state) =>
        state.getProfile
    );



  const updateProfile =
    useProfileStore(
      (state) =>
        state.updateProfile
    );



  const changePassword =
    useProfileStore(
      (state) =>
        state.changePassword
    );





  // FETCH PROFILE
  useEffect(() => {

    getProfile();

  }, []);





  // RESET FORM
  useEffect(() => {

    if (profile) {

      reset({

        name:
          profile.name,

        profilePic:
          profile.profilePic
      });
    }

  }, [profile]);







  // UPDATE PROFILE
  const onUpdateProfile =
    async (data) => {

      await updateProfile(
        data
      );



      toast.success(
        "Profile Updated"
      );
    };






  // CHANGE PASSWORD
  const onChangePassword =
    async (data) => {

      await changePassword({

        oldPassword:
          data.oldPassword,

        newPassword:
          data.newPassword
      });



      toast.success(
        "Password Changed"
      );
    };






  return (

    <div className="min-h-screen bg-slate-950 p-6 md:p-10 text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>








      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-10 relative z-10">

        {/* BACK BUTTON */}
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-xl transition-all"
        >

          <FaArrowLeft />

          Back

        </button>





        {/* TITLE */}
        <div className="flex items-center gap-4">

          <div className="bg-cyan-500/20 p-4 rounded-2xl border border-cyan-500/20">

            <FaUserCircle className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold">

              Profile

            </h1>



            <p className="text-gray-400">

              Manage your account settings

            </p>

          </div>

        </div>

      </div>









      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">

        {/* PROFILE SECTION */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl"
        >

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-8">

            <img
              src={
                profile?.profilePic ||

                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }

              alt="profile"

              className="w-36 h-36 rounded-full border-4 border-cyan-400 shadow-2xl object-cover"
            />



            <h2 className="text-3xl font-bold mt-5">

              {profile?.name}

            </h2>



            <p className="text-cyan-400 mt-2">

              {profile?.role}

            </p>

          </div>






          {/* UPDATE FORM */}
          <form
            onSubmit={handleSubmit(
              onUpdateProfile
            )}
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label className="block mb-2 text-gray-300">

                Name

              </label>

              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
              />

            </div>





            {/* PROFILE PIC */}
            <div>

              <label className="block mb-2 text-gray-300">

                Profile Image URL

              </label>

              <input
                type="text"
                {...register("profilePic")}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
              />

            </div>





            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-gray-300">

                Email

              </label>

              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400"
              />

            </div>






            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >

              <FaSave />

              Update Profile

            </button>

          </form>

        </motion.div>









        {/* PASSWORD SECTION */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.2
          }}

          className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl"
        >

          <div className="flex items-center gap-3 mb-8">

            <FaLock className="text-cyan-400 text-2xl" />

            <h2 className="text-3xl font-bold">

              Change Password

            </h2>

          </div>






          <form
            onSubmit={handleSubmit(
              onChangePassword
            )}
            className="space-y-5"
          >

            {/* OLD PASSWORD */}
            <div>

              <label className="block mb-2 text-gray-300">

                Old Password

              </label>

              <input
                type="password"
                {...register(
                  "oldPassword"
                )}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
              />

            </div>






            {/* NEW PASSWORD */}
            <div>

              <label className="block mb-2 text-gray-300">

                New Password

              </label>

              <input
                type="password"
                {...register(
                  "newPassword"
                )}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
              />

            </div>






            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/20"
            >

              <FaLock />

              Change Password

            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default Profile;