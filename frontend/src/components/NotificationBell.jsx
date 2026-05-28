import { useEffect, useState } from "react";

import toast from "react-hot-toast";

// import socket from "../socket";

import { useNoticeStore } from "../store/noticeStore";

function NotificationBell() {

  const [open, setOpen] =
    useState(false);

  const notices =
    useNoticeStore(
      (state) =>
        state.notices
    );

  const getNotices =
    useNoticeStore(
      (state) =>
        state.getNotices
    );

  const markAsRead =
    useNoticeStore(
      (state) =>
        state.markAsRead
    );


  // FETCH ONLY
  useEffect(() => {

    // FETCH OLD NOTICES
    getNotices();

  }, []);


  // UNREAD NOTICES
  const unreadNotices =
    notices.filter(
      (notice) =>
        !notice.isRead
    );


  // OPEN BELL
  const handleBellClick =
    async () => {

      setOpen(!open);

      // MARK READ
      if (!open) {

        await markAsRead();

        getNotices();
      }
    };


  return (

    <div className="relative">

      {/* BELL BUTTON */}
      <button
        onClick={
          handleBellClick
        }
        className="relative text-2xl"
      >

        🔔

        {/* UNREAD COUNT */}
        {unreadNotices.length > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">

            {unreadNotices.length}

          </span>

        )}

      </button>


      {/* DROPDOWN */}
      {open && (

        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">

          {/* HEADER */}
          <div className="p-4 border-b font-bold bg-blue-500 text-white">

            Notifications

          </div>


          {/* BODY */}
          <div className="max-h-80 overflow-y-auto">

            {notices.length === 0 ? (

              <p className="p-4 text-gray-500">

                No notifications

              </p>

            ) : (

              notices.map((notice) => (

                <div
                  key={notice._id}
                  className={`p-4 border-b hover:bg-gray-50 transition duration-200 ${
                    !notice.isRead
                      ? "bg-blue-50"
                      : "bg-white"
                  }`}
                >

                  <h3 className="font-semibold text-gray-800">

                    {notice.title}

                  </h3>

                  <p className="text-sm text-gray-600 mt-1">

                    {notice.description}

                  </p>

                  <p className="text-xs text-gray-400 mt-2">

                    {new Date(
                      notice.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default NotificationBell;