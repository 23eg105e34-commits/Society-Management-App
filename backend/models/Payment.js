import { Schema, model }
from "mongoose";


const PaymentSchema =
new Schema(

  {

    resident: {

      type:
        Schema.Types.ObjectId,

      ref: "User",

      required: true
    },


    amount: {

      type: Number,

      required: [
        true,
        "Amount is required"
      ]
    },


    month: {

      type: String,

      required: [
        true,
        "Month is required"
      ]
    },


    paymentDate: {

      type: Date
    },


    status: {

      type: String,

      enum: [
        "PENDING",
        "PAID"
      ],

      default: "PENDING"
    }

  },

  {
    timestamps: true
  }
);


export const PaymentModel =
  model(
    "Payment",
    PaymentSchema
);