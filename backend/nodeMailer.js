const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: 587, 
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

const options = {
    from: process.env.EMAIL_USERNAME,
    to: "YOUREMAILHERE@email.com",
    subject: "Welcome to NoBS, where you can stop your BS and get to work",
    text: "Get Ready to work out",
}

transporter.sendMail(options, (error, info) => {
    if(error) return console.log(error);
    
    console.log('Email sent: ', info);
})





