import { PaymentModel }
from "../models/Payment.js";


// CREATE MAINTENANCE BILL
// OWNER ONLY
export const createPayment = async (
  req,
  res,
  next
) => {

  try {

    const {
      amount,
      month,
      resident
    } = req.body;


    const payment =
      await PaymentModel.create({

        amount,

        month,

        resident,

        status: "PENDING"
      });


    res.status(201).json({

      message:
        "Maintenance Bill Created",

      payment
    });

  } catch (err) {

    console.log(err);

    next(err);
  }
};




// GET PAYMENTS
export const getPayments = async (
  req,
  res,
  next
) => {

  try {

    let payments;


    // OWNER → ALL PAYMENTS
    if (
      req.user.role === "OWNER"
    ) {

      payments =
        await PaymentModel.find()
        .populate(
          "resident",
          "name email"
        );
    }


    // RESIDENT → ONLY OWN PAYMENTS
    else {

      payments =
        await PaymentModel.find({

          resident:
            req.user.userId
        });
    }


    res.status(200).json(
      payments
    );

  } catch (err) {

    next(err);
  }
};




// PAY BILL
// RESIDENT ONLY
export const payPayment = async (
  req,
  res,
  next
) => {

  try {

    const { id } = req.params;


    const payment =
      await PaymentModel.findById(id);


    if (!payment) {

      return res.status(404).json({

        message:
          "Payment not found"
      });
    }


    // UPDATE STATUS
    payment.status = "PAID";

    await payment.save();


    res.status(200).json({

      message:
        "Bill Paid Successfully",

      payment
    });

  } catch (err) {

    next(err);
  }
};