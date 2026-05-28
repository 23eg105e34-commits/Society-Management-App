import { NoticeModel }
from "../models/Notice.js";

//import { io }from "../server.js";



// ADD NOTICE
export const addNotice = async (
  req,
  res,
  next
) => {

  try {

    const {
      title,
      description
    } = req.body;


    const notice =
      await NoticeModel.create({

        title,

        description
      });



    // REAL-TIME SOCKET EVENT
    //io.emit(
      //"new_notice",
      //notice
    //);



    res.status(201).json({

      message:
        "Notice Added",

      notice
    });

  } catch (err) {

    next(err);
  }
};




// GET NOTICES
export const getNotices = async (
  req,
  res,
  next
) => {

  try {

    const notices =
      await NoticeModel.find()
      .sort({
        createdAt: -1
      });


    res.status(200).json(
      notices
    );

  } catch (err) {

    next(err);
  }
};




// DELETE NOTICE
export const deleteNotice = async (
  req,
  res,
  next
) => {

  try {

    const { id } =
      req.params;


    await NoticeModel.findByIdAndDelete(
      id
    );


    res.status(200).json({

      message:
        "Notice Deleted"
    });

  } catch (err) {

    next(err);
  }
};




// MARK ALL NOTICES AS READ
export const markNotificationsRead =
async (
  req,
  res,
  next
) => {

  try {

    await NoticeModel.updateMany(

      {},

      {
        isRead: true
      }
    );


    res.status(200).json({

      message:
        "Notifications marked as read"
    });

  } catch (err) {

    next(err);
  }
};