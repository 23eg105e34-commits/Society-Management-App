import nodemailer from "nodemailer";



const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL,

      pass:
        process.env.EMAIL_PASS
    }
  });




export const sendEmail =
  async (

    to,
    subject,
    text

  ) => {

    try {

      await transporter.sendMail({

        from:
          process.env.EMAIL,

        to,

        subject,

        text
      });



      console.log(
        "Email sent successfully"
      );

    } catch (err) {

      console.log(
        "Email error:",
        err
      );
    }
  };