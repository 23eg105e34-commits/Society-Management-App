import { useEffect, useState }
from "react";

import { motion }
from "framer-motion";

import { useForm }
from "react-hook-form";

import toast
from "react-hot-toast";

import { useNavigate }
from "react-router-dom";

import { useAuth }
from "../store/authStore";

import { useComplaintStore }
from "../store/complaintStore";

import {
  FaArrowLeft,
  FaExclamationCircle,
  FaCheckCircle,
  FaSearch
}
from "react-icons/fa";


function Complaints() {

  const navigate =
    useNavigate();



  const {
    register,
    handleSubmit,
    reset
  } = useForm();




  // SEARCH + FILTER
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");




  const currentUser =
    useAuth(
      (state) =>
        state.currentUser
    );



  const complaints =
    useComplaintStore(
      (state) =>
        state.complaints
    );



  const getComplaints =
    useComplaintStore(
      (state) =>
        state.getComplaints
    );



  const addComplaint =
    useComplaintStore(
      (state) =>
        state.addComplaint
    );



  const updateStatus =
    useComplaintStore(
      (state) =>
        state.updateStatus
    );






  // FETCH
  useEffect(() => {

    getComplaints();

  }, []);







  // FILTERED COMPLAINTS
  const filteredComplaints =
    complaints.filter((complaint) => {

      const matchesSearch =

        complaint.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchesStatus =

        statusFilter === "ALL"

        ||

        complaint.status ===
        statusFilter;



      return (
        matchesSearch &&
        matchesStatus
      );
    });







  // ADD COMPLAINT
  const onAddComplaint =
    async (
      complaintObj
    ) => {

      await addComplaint(
        complaintObj
      );



      toast.success(
        "Complaint Added"
      );



      getComplaints();

      reset();
    };







  // UPDATE STATUS
  const handleResolve =
    async (id) => {

      await updateStatus(

        id,

        "RESOLVED"
      );



      toast.success(
        "Complaint Resolved"
      );



      getComplaints();
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

            <FaExclamationCircle className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold text-white">

              Complaints

            </h1>



            <p className="text-gray-400">

              Society issue tracking & resolution

            </p>

          </div>

        </div>

      </div>












      {/* ADD FORM */}
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

            Raise Complaint

          </h2>



          <form
            onSubmit={handleSubmit(
              onAddComplaint
            )}
            className="space-y-5"
          >

            {/* TITLE */}
            <input
              type="text"
              placeholder="Complaint Title"
              {...register("title")}
              className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* DESCRIPTION */}
            <textarea
              placeholder="Complaint Description"
              {...register(
                "description"
              )}
              className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 h-32 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* BUTTON */}
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
            >

              Raise Complaint

            </button>

          </form>

        </motion.div>

      )}













      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <div className="flex items-center gap-3 flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5">

          <FaSearch className="text-cyan-400" />

          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-transparent py-4 text-white placeholder:text-gray-400 focus:outline-none"
          />

        </div>





        {/* FILTER */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none"
        >

          <option
            value="ALL"
            className="bg-slate-900"
          >
            All Complaints
          </option>

          <option
            value="PENDING"
            className="bg-slate-900"
          >
            Pending
          </option>

          <option
            value="RESOLVED"
            className="bg-slate-900"
          >
            Resolved
          </option>

        </select>

      </div>













      {/* COMPLAINT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredComplaints.length === 0 ? (

          <div className="text-gray-400 text-lg">

            No complaints available

          </div>

        ) : (

          filteredComplaints.map(
            (complaint) => (

              <motion.div

                key={complaint._id}

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
                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h2 className="text-2xl font-bold text-white">

                      {complaint.title}

                    </h2>

                  </div>





                  {/* STATUS */}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                      complaint.status ===
                      "PENDING"

                        ? "bg-red-500/20 text-red-400"

                        : "bg-green-500/20 text-green-400"
                    }`}
                  >

                    {complaint.status}

                  </div>

                </div>









                {/* DESCRIPTION */}
                <p className="text-gray-300 leading-relaxed mb-6">

                  {complaint.description}

                </p>









                {/* OWNER INFO */}
                {currentUser?.role ===
                  "OWNER" && (

                  <p className="text-gray-400 mb-6">

                    Resident:
                    {" "}

                    <span className="text-white font-semibold">

                      {
                        complaint
                        ?.resident
                        ?.name
                      }

                    </span>

                  </p>

                )}










                {/* OWNER ACTION */}
                {currentUser?.role ===
                  "OWNER" &&

                  complaint.status ===
                    "PENDING" && (

                  <button
                    onClick={() =>
                      handleResolve(
                        complaint._id
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                  >

                    <FaCheckCircle />

                    Mark Resolved

                  </button>

                )}

              </motion.div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default Complaints;