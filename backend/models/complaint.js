import { Schema, model }
from "mongoose";


const ComplaintSchema =
new Schema(

  {

    title: {

      type: String,

      required: true
    },


    description: {

      type: String,

      required: true
    },


    resident: {

      type:
        Schema.Types.ObjectId,

      ref: "User"
    },


    status: {

      type: String,

      enum: [

        "PENDING",
        "RESOLVED"
      ],

      default:
        "PENDING"
    }

  },

  {
    timestamps: true
  }
);


export const ComplaintModel =
  model(

    "Complaint",

    ComplaintSchema
  );