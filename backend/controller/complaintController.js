import { ComplaintModel }
from "../models/complaint.js";


// ADD COMPLAINT
export const addComplaint =
async (
  req,
  res,
  next
) => {

  try {

    const {
      title,
      description
    } = req.body;


    const complaint =
      await ComplaintModel.create({

        title,

        description,

        resident:
          req.user.userId
      });


    res.status(201).json({

      message:
        "Complaint Added",

      complaint
    });

  } catch (err) {

    next(err);
  }
};




// GET COMPLAINTS
export const getComplaints =
async (
  req,
  res,
  next
) => {

  try {

    let complaints;


    // OWNER -> ALL
    if (
      req.user.role ===
      "OWNER"
    ) {

      complaints =
        await ComplaintModel.find()

        .populate(
          "resident",
          "name email"
        )

        .sort({
          createdAt: -1
        });

    }

    // RESIDENT -> OWN
    else {

      complaints =
        await ComplaintModel.find({

          resident:
            req.user.userId
        })

        .sort({
          createdAt: -1
        });
    }


    res.status(200).json(
      complaints
    );

  } catch (err) {

    next(err);
  }
};




// UPDATE STATUS
export const updateComplaintStatus =
async (
  req,
  res,
  next
) => {

  try {

    const { id } =
      req.params;


    const complaint =
      await ComplaintModel.findById(
        id
      );


    if (!complaint) {

      return res.status(404).json({

        message:
          "Complaint not found"
      });
    }


    complaint.status =
      req.body.status;


    await complaint.save();


    res.status(200).json({

      message:
        "Complaint status updated",

      complaint
    });

  } catch (err) {

    next(err);
  }
};