import { FacilityModel }
from "../models/Facility.js";


// RESIDENT REQUESTS FACILITY
export const bookFacility =
async (
  req,
  res,
  next
) => {

  try {

    const {
      facilityName,
      date,
      timeSlot
    } = req.body;


    // CHECK EXISTING APPROVED BOOKING
    const existingBooking =
      await FacilityModel.findOne({

        facilityName,

        date,

        timeSlot,

        status: "APPROVED"
      });


    if (existingBooking) {

      return res.status(400).json({

        message:
          "Facility already booked"
      });
    }


    // CREATE REQUEST
    const booking =
      await FacilityModel.create({

        facilityName,

        date,

        timeSlot,

        bookedBy:
          req.user.userId,

        status: "PENDING"
      });


    res.status(201).json({

      message:
        "Facility request sent",

      booking
    });

  } catch (err) {

    next(err);
  }
};




// GET ALL BOOKINGS
export const getAllBookings =
async (
  req,
  res,
  next
) => {

  try {

    const bookings =
      await FacilityModel.find()

      .populate(
        "bookedBy",
        "name email"
      );


    res.status(200).json(
      bookings
    );

  } catch (err) {

    next(err);
  }
};




// OWNER APPROVES BOOKING
export const approveBooking =
async (
  req,
  res,
  next
) => {

  try {

    const { id } =
      req.params;


    const booking =
      await FacilityModel.findById(
        id
      );


    if (!booking) {

      return res.status(404).json({

        message:
          "Booking not found"
      });
    }


    booking.status =
      "APPROVED";

    await booking.save();


    res.status(200).json({

      message:
        "Booking approved",

      booking
    });

  } catch (err) {

    next(err);
  }
};




// OWNER REJECTS BOOKING
export const rejectBooking =
async (
  req,
  res,
  next
) => {

  try {

    const { id } =
      req.params;


    const booking =
      await FacilityModel.findById(
        id
      );


    if (!booking) {

      return res.status(404).json({

        message:
          "Booking not found"
      });
    }


    booking.status =
      "REJECTED";

    await booking.save();


    res.status(200).json({

      message:
        "Booking rejected",

      booking
    });

  } catch (err) {

    next(err);
  }
};