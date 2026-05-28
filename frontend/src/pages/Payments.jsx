import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { usePaymentStore } from "../store/paymentStore";

import { useAuth } from "../store/authStore";

import { useUserStore } from "../store/userStore";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaCheckCircle,
  FaSearch
} from "react-icons/fa";


function Payments() {

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




  // SEARCH + FILTER
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");




  // PAYMENT STORE
  const payments =
    usePaymentStore(
      (state) =>
        state.payments
    );


  const getPayments =
    usePaymentStore(
      (state) =>
        state.getPayments
    );


  const addPayment =
    usePaymentStore(
      (state) =>
        state.addPayment
    );


  const payPayment =
    usePaymentStore(
      (state) =>
        state.payPayment
    );




  // USER STORE
  const residents =
    useUserStore(
      (state) =>
        state.residents
    );


  const getResidents =
    useUserStore(
      (state) =>
        state.getResidents
    );





  // FETCH DATA
  useEffect(() => {

    getPayments();



    if (
      currentUser?.role ===
      "OWNER"
    ) {

      getResidents();
    }

  }, []);







  // FILTERED PAYMENTS
  const filteredPayments =
    payments.filter((payment) => {

      const matchesSearch =

        payment.month
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchesStatus =

        statusFilter === "ALL"

        ||

        payment.status ===
        statusFilter;



      return (
        matchesSearch &&
        matchesStatus
      );
    });







  // OWNER CREATES BILL
  const onAddPayment =
    async (paymentObj) => {

      await addPayment(
        paymentObj
      );



      toast.success(
        "Maintenance Bill Created"
      );



      getPayments();

      reset();
    };







  // RESIDENT PAYS BILL
  const handlePay =
    async (id) => {

      await payPayment(id);



      toast.success(
        "Payment Successful"
      );



      getPayments();
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

            <FaMoneyBillWave className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold text-white">

              Payments

            </h1>



            <p className="text-gray-400">

              Society maintenance & billing

            </p>

          </div>

        </div>

      </div>









      {/* OWNER ONLY FORM */}
      {currentUser?.role ===
        "OWNER" && (

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

            Create Maintenance Bill

          </h2>



          <form
            onSubmit={
              handleSubmit(
                onAddPayment
              )
            }
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >

            {/* AMOUNT */}
            <input
              type="number"
              placeholder="Amount"

              {...register(
                "amount"
              )}

              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* MONTH */}
            <input
              type="text"
              placeholder="Month"

              {...register(
                "month"
              )}

              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* RESIDENT DROPDOWN */}
            <select

              {...register(
                "resident"
              )}

              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            >

              <option
                value=""
                className="text-black"
              >
                Select Resident
              </option>

              {residents.map(
                (resident) => (

                <option
                  key={resident._id}
                  value={resident._id}
                  className="text-black"
                >

                  {resident.name}

                </option>

              ))}

            </select>



            {/* SUBMIT */}
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
            >

              Create Bill

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
            placeholder="Search by month..."
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
            All Payments
          </option>

          <option
            value="PENDING"
            className="bg-slate-900"
          >
            Pending
          </option>

          <option
            value="PAID"
            className="bg-slate-900"
          >
            Paid
          </option>

        </select>

      </div>












      {/* PAYMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredPayments.length === 0 ? (

          <div className="text-gray-400 text-lg">

            No payments available

          </div>

        ) : (

          filteredPayments.map(
            (payment) => (

            <motion.div

              key={payment._id}

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

                  <h2 className="text-3xl font-bold text-white">

                    ₹ {payment.amount}

                  </h2>



                  <p className="text-cyan-400 mt-2">

                    {payment.month}

                  </p>

                </div>





                {/* STATUS */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                    payment.status ===
                    "PAID"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >

                  {payment.status}

                </div>

              </div>









              {/* DATE */}
              <p className="text-gray-400 mb-6">

                Created:
                {" "}

                {new Date(
                  payment.createdAt
                ).toLocaleDateString()}

              </p>









              {/* PAY BUTTON */}
              {currentUser?.role ===
                "RESIDENT" &&

                payment.status ===
                "PENDING" && (

                <button
                  onClick={() =>
                    handlePay(
                      payment._id
                    )
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.02]"
                >

                  Pay Now

                </button>

              )}









              {/* PAID */}
              {payment.status ===
                "PAID" && (

                <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">

                  <FaCheckCircle />

                  Payment Completed

                </div>

              )}

            </motion.div>

          ))

        )}

      </div>

    </div>
  );
}

export default Payments;