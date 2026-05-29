import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

// SOCKET REMOVED
// import socket from "../socket";

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


  // FETCH VISITORS ONLY
  useEffect(() => {

    getVisitors();

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


console.log("Visitors State:", visitors);
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

              Visitor monitoring system

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

          <input
            type="text"
            placeholder="Visitor Name"
            {...register("name")}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            {...register(
              "mobileNumber"
            )}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white"
          />

          <input
            type="text"
            placeholder="Flat Number"
            {...register(
              "flatNumber"
            )}
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white"
          />

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-semibold"
          >

            Add Visitor

          </button>

        </form>

           </motion.div>

      {/* VISITORS LIST */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Visitors List
        </h2>

        {filteredVisitors.length === 0 ? (
          <p className="text-gray-400">
            No visitors found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Mobile</th>
                  <th className="text-left p-3">Flat</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr
                    key={visitor._id}
                    className="border-b border-white/10"
                  >
                    <td className="p-3">
                      {visitor.name}
                    </td>

                    <td className="p-3">
                      {visitor.mobileNumber}
                    </td>

                    <td className="p-3">
                      {visitor.flatNumber}
                    </td>

                    <td className="p-3">
                      {visitor.status || "IN"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          handleExit(visitor._id)
                        }
                        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
                      >
                        Exit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

    </div>
  );
}

export default Visitors;
