import { VisitorModel }
from "../models/Visitor.js";

import { io }
from "../server.js";



// ADD VISITOR
export const addVisitor =
async (
  req,
  res,
  next
) => {

  try {

    const {
      name,
      mobileNumber,
      flatNumber
    } = req.body;



    const visitor =
      await VisitorModel.create({

        name,

        mobileNumber,

        flatNumber
      });



    // REAL-TIME SOCKET EVENT
    io.emit(
      "new_visitor",
      visitor
    );



    res.status(201).json({

      message:
        "Visitor added successfully",

      visitor
    });

  } catch (err) {

    next(err);
  }
};




// GET VISITORS
export const getVisitors =
async (
  req,
  res,
  next
) => {

  try {

    const visitors =
      await VisitorModel.find();



    res.status(200).json(
      visitors
    );

  } catch (err) {

    next(err);
  }
};




// MARK VISITOR EXIT
export const markVisitor =
async (
  req,
  res,
  next
) => {

  try {

    const { id } =
      req.params;



    const visitor =
      await VisitorModel.findById(id);



    if (!visitor) {

      return res.status(404).json({

        message:
          "Visitor not found"
      });
    }



    visitor.exitTime =
      new Date();



    visitor.status =
      "OUT";



    await visitor.save();



    // REAL-TIME EXIT EVENT
    io.emit(
      "visitor_exit",
      visitor
    );



    res.status(200).json({

      message:
        "Visitor exit recorded",

      visitor
    });

  } catch (err) {

    next(err);
  }
};