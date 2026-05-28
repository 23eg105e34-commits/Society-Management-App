import { useEffect } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { useNoticeStore } from "../store/noticeStore";

import { useAuth } from "../store/authStore";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaBell,
  FaTrash
} from "react-icons/fa";


function Notices() {

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



  const notices =
    useNoticeStore((state) =>
      state.notices
    );


  const getNotices =
    useNoticeStore((state) =>
      state.getNotices
    );


  const addNotice =
    useNoticeStore((state) =>
      state.addNotice
    );


  const deleteNotice =
    useNoticeStore((state) =>
      state.deleteNotice
    );



  // FETCH NOTICES
  useEffect(() => {

    getNotices();

  }, []);




  // ADD NOTICE
  const onAddNotice =
    async (noticeObj) => {

      await addNotice(
        noticeObj
      );



      toast.success(
        "Notice Added"
      );



      getNotices();

      reset();
    };




  // DELETE NOTICE
  const handleDelete =
    async (id) => {

      await deleteNotice(id);



      toast.success(
        "Notice Deleted"
      );



      getNotices();
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



        {/* PAGE TITLE */}
        <div className="flex items-center gap-4">

          <div className="bg-cyan-500/20 p-4 rounded-2xl border border-cyan-500/20">

            <FaBell className="text-cyan-400 text-2xl" />

          </div>



          <div>

            <h1 className="text-4xl font-bold text-white">
              Notices
            </h1>

            <p className="text-gray-400">
              Society announcements & updates
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

            Create Notice

          </h2>



          <form
            onSubmit={handleSubmit(
              onAddNotice
            )}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >

            {/* TITLE */}
            <input
              type="text"
              placeholder="Notice Title"
              {...register("title")}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* DESCRIPTION */}
            <input
              type="text"
              placeholder="Notice Description"
              {...register("description")}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            />



            {/* BUTTON */}
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
            >

              Add Notice

            </button>

          </form>

        </motion.div>

      )}






      {/* NOTICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {notices.length === 0 ? (

          <div className="text-gray-400 text-lg">

            No notices available

          </div>

        ) : (

          notices.map((notice) => (

            <motion.div

              key={notice._id}

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
              <div className="flex justify-between items-start mb-4">

                <div>

                  <h2 className="text-2xl font-bold text-white">

                    {notice.title}

                  </h2>



                  <p className="text-sm text-cyan-400 mt-2">

                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>



                {/* DELETE */}
                {currentUser?.role ===
                  "OWNER" && (

                  <button
                    onClick={() =>
                      handleDelete(
                        notice._id
                      )
                    }
                    className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3 rounded-2xl transition-all"
                  >

                    <FaTrash />

                  </button>

                )}

              </div>



              {/* DESCRIPTION */}
              <p className="text-gray-300 leading-relaxed">

                {notice.description}

              </p>

            </motion.div>

          ))

        )}

      </div>

    </div>
  );
}

export default Notices;