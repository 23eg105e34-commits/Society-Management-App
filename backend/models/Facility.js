import { Schema, model } from "mongoose";

const FacilitySchema = new Schema(

  {

    facilityName: {

      type: String,

      required: [
        true,
        "Facility Name is required"
      ],

      enum: [
        "gym",
        "clubhouse",
        "party hall"
      ]
    },



    date: {

      type: Date,

      required: [
        true,
        "Date is required"
      ]
    },



    timeSlot: {

      type: String,

      required: [
        true,
        "Time slot is required"
      ]
    },



    bookedBy: {

      type:
        Schema.Types.ObjectId,

      ref: "User",

      required: true
    },



    // APPROVAL STATUS
    status: {

      type: String,

      enum: [

        "PENDING",

        "APPROVED",

        "REJECTED"
      ],

      default: "PENDING"
    }

  },

  {
    timestamps: true
  }
);


export const FacilityModel =
  model(
    "Facility",
    FacilitySchema
);