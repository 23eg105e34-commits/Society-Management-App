import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import socket from "../socket";

import { useVisitorStore } from "../store/visitorStore";

import {
  FaArrowLeft,
  FaUserFriends,
  FaSignOutAlt,
  FaSearch
} from "react-icons/fa";



function Visitors() {

  const navigate = useNavigate();


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




  const visitors =
    useVisitorStore(
      (state) =>
        state.visitors
    );



  const getVisitors =
    useVisitorStore(
      (state) =>
        state.getVisitors
    );



  const addVisitor =
    useVisitorStore(
      (state) =>
        state.addVisitor
    );



  const markExit =
    useVisitorStore(
      (state) =>
        state.markExit
    );






  // FETCH + SOCKET
  useEffect(() => {

    // FETCH VISITORS
    getVisitors();




    // NEW VISITOR EVENT
    socket.on(

      "new_visitor",

      (visitor) => {

        toast.success(

          `${visitor.name} arrived at Flat ${visitor.flatNumber} 🚨`

        );



        getVisitors();
      }
    );




    // VISITOR EXIT EVENT
    socket.on(

      "visitor_exit",

      (visitor) => {

        toast(

          `${visitor.name} exited society 👋`
        );



        getVisitors();
      }
    );




    // CLEANUP
    return () => {

      socket.off(
        "new_visitor"
      );

      socket.off(
        "visitor_exit"
      );
    };

  }, []);







  // FILTERED VISITORS
  const filteredVisitors =
    visitors.filter((visitor) => {

      const matchesSearch =

        visitor.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        visitor.flatNumber
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchesStatus =

        statusFilter === "ALL"

        ||

        visitor.status ===
        statusFilter;



      return (
        matchesSearch &&
        matchesStatus
      );
    });







  // ADD VISITOR
  const onAddVisitor =
    async (
      visitorObj
    ) => {

      await addVisitor(
        visitorObj
      );



      toast.success(
        "Visitor Added"
      );



      getVisitors();

      reset();
    };







  // MARK EXIT
  const handleExit =
    async (id) => {

      await markExit(id);



      toast.success(
        "Visitor Exited"
      );



      getVisitors();
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

            <FaUserFriends className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold text-white">

              Visitors

            </h1>



            <p className="text-gray-400">

              Real-time visitor monitoring system

            </p>

          </div>

        </div>

      </div>









      {/* ADD VISITOR FORM */}
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

          Add Visitor

        </h2>



        <form
          onSubmit={
            handleSubmit(
              onAddVisitor
            )
          }
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >

          {/* NAME */}
          <input
            type="text"
            placeholder="Visitor Name"
            {...register("name")}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          />



          {/* MOBILE */}
          <input
            type="text"
            placeholder="Mobile Number"
            {...register(
              "mobileNumber"
            )}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          />



          {/* FLAT */}
          <input
            type="text"
            placeholder="Flat Number"
            {...register(
              "flatNumber"
            )}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          />



          {/* BUTTON */}
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
          >

            Add Visitor

          </button>

        </form>

      </motion.div>









      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <div className="flex items-center gap-3 flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5">

          <FaSearch className="text-cyan-400" />

          <input
            type="text"
            placeholder="Search by name or flat..."
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
            All Status
          </option>

          <option
            value="IN"
            className="bg-slate-900"
          >
            IN
          </option>

          <option
            value="OUT"
            className="bg-slate-900"
          >
            OUT
          </option>

        </select>

      </div>









      {/* VISITOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredVisitors.length === 0 ? (

          <div className="text-gray-400 text-lg">

            No visitors found

          </div>

        ) : (

          filteredVisitors.map(
            (visitor) => (

            <motion.div

              key={visitor._id}

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

                  <h2 className="text-2xl font-bold text-white">

                    {visitor.name}

                  </h2>



                  <p className="text-cyan-400 mt-2">

                    Flat:
                    {" "}
                    {visitor.flatNumber}

                  </p>

                </div>





                {/* STATUS */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                    visitor.status === "IN"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >

                  {visitor.status}

                </div>

              </div>









              {/* MOBILE */}
              <p className="text-gray-300 mb-6">

                Mobile:
                {" "}

                <span className="text-white font-semibold">

                  {visitor.mobileNumber}

                </span>

              </p>








              {/* EXIT BUTTON */}
              {visitor.status ===
                "IN" && (

                <button
                  onClick={() =>
                    handleExit(
                      visitor._id
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                >

                  <FaSignOutAlt />

                  Mark Exit

                </button>

              )}

            </motion.div>

          ))

        )}

      </div>

    </div>
  );
}

export default Visitors;