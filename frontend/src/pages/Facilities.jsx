import { useEffect } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { useFacilityStore } from "../store/facilityStore";

import { useAuth } from "../store/authStore";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";


function Facilities() {

  const navigate = useNavigate();


  const currentUser =
    useAuth((state) =>
      state.currentUser
    );


  const {
    register,
    handleSubmit,
    reset
  } = useForm();



  const bookings =
    useFacilityStore(
      (state) =>
        state.bookings
    );


  const getBookings =
    useFacilityStore(
      (state) =>
        state.getBookings
    );


  const bookFacility =
    useFacilityStore(
      (state) =>
        state.bookFacility
    );


  const approveBooking =
    useFacilityStore(
      (state) =>
        state.approveBooking
    );


  const rejectBooking =
    useFacilityStore(
      (state) =>
        state.rejectBooking
    );



  // FETCH BOOKINGS
  useEffect(() => {

    getBookings();

  }, []);




  // RESIDENT REQUESTS FACILITY
  const onBookFacility =
    async (bookingObj) => {

      await bookFacility(
        bookingObj
      );



      toast.success(
        "Facility Request Sent"
      );



      getBookings();

      reset();
    };




  // OWNER APPROVES
  const handleApprove =
    async (id) => {

      await approveBooking(id);



      toast.success(
        "Booking Approved"
      );



      getBookings();
    };




  // OWNER REJECTS
  const handleReject =
    async (id) => {

      await rejectBooking(id);



      toast.success(
        "Booking Rejected"
      );



      getBookings();
    };




  return (

    <div className="min-h-screen bg-slate-950 p-6 md:p-10">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-10">

        {/* BACK BUTTON */}
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-lg transition-all"
        >

          <FaArrowLeft />

          Back

        </button>



        {/* TITLE */}
        <div className="flex items-center gap-4">

          <div className="bg-cyan-500/20 p-4 rounded-2xl border border-cyan-500/20">

            <FaBuilding className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold text-white">

              Facilities

            </h1>



            <p className="text-gray-400">

              Manage facility bookings & approvals

            </p>

          </div>

        </div>

      </div>






      {/* RESIDENT ONLY FORM */}
      {currentUser?.role ===
        "RESIDENT" && (

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl mb-10"
        >

          <h2 className="text-2xl font-bold text-white mb-6">

            Request Facility

          </h2>



          <form
            onSubmit={
              handleSubmit(
                onBookFacility
              )
            }
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >

            {/* FACILITY */}
            <select
              {...register(
                "facilityName"
              )}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            >

              <option
                value=""
                className="text-black"
              >
                Select Facility
              </option>

              <option
                value="gym"
                className="text-black"
              >
                Gym
              </option>

              <option
                value="clubhouse"
                className="text-black"
              >
                Clubhouse
              </option>

              <option
                value="party hall"
                className="text-black"
              >
                Party Hall
              </option>

            </select>



            {/* DATE */}
            <input
              type="date"
              {...register("date")}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* TIMESLOT */}
            <input
              type="text"
              placeholder="Time Slot"
              {...register(
                "timeSlot"
              )}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* BUTTON */}
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
            >

              Request Facility

            </button>

          </form>

        </motion.div>

      )}








      {/* BOOKINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {bookings.length === 0 ? (

          <div className="text-gray-400 text-lg">

            No facility bookings available

          </div>

        ) : (

          bookings.map(
            (booking) => (

            <motion.div

              key={booking._id}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              whileHover={{
                scale: 1.02
              }}

              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-5">

                <div>

                  <h2 className="text-2xl font-bold text-white capitalize">

                    {booking.facilityName}

                  </h2>



                  <p className="text-cyan-400 mt-2">

                    {booking.timeSlot}

                  </p>

                </div>



                {/* STATUS */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                    booking.status ===
                    "APPROVED"
                      ? "bg-green-500/20 text-green-400"
                      : booking.status ===
                        "REJECTED"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >

                  {booking.status}

                </div>

              </div>






              {/* DATE */}
              <p className="text-gray-400 mb-3">

                Date:
                {" "}

                {new Date(
                  booking.date
                ).toLocaleDateString()}

              </p>





              {/* RESIDENT */}
              <p className="text-gray-300 mb-6">

                Resident:
                {" "}

                <span className="text-white font-semibold">

                  {booking.bookedBy?.name}

                </span>

              </p>






              {/* OWNER ACTIONS */}
              {currentUser?.role ===
                "OWNER" &&

                booking.status ===
                "PENDING" && (

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleApprove(
                        booking._id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                  >

                    <FaCheckCircle />

                    Approve

                  </button>



                  <button
                    onClick={() =>
                      handleReject(
                        booking._id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                  >

                    <FaTimesCircle />

                    Reject

                  </button>

                </div>

              )}

            </motion.div>

          ))

        )}

      </div>

    </div>
  );
}

export default Facilities;