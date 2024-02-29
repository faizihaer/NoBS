const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const options = {
  from: process.env.EMAIL_USERNAME,
  //HERE SHOULD BE WHERE THE USER's EMAIL SHOULD BE
  to: "USEREMAIL@email.com",
  subject: "Welcome to NoBS, where you can stop your BS and get to work",
  text: "Get Ready to work out",
};

const sendMail = async () => {
  try {
    await transporter.sendMail(options);
    console.log("Email has been sent successfully");
  } catch (error) {
    console.error(error);
  }
};

sendMail(transporter, options);

//----------------------------------------------------------------------------------------------
//OUTLOOK EMAIL ACCOUNT

// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const options = {
//   from: process.env.EMAIL_USERNAME,
//   to: "YOUREMAILHERE@email.com",
//   subject: "Welcome to NoBS, where you can stop your BS and get to work",
//   text: "Get Ready to work out",
// };

// transporter.sendMail(options, (error, info) => {
//   if (error) return console.log(error);

//   console.log("Email sent: ", info);
// });
