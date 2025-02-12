import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MY_EMAIL)
// console.log(process.env.MY_PASSWORD)

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3888/api/provider/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };
//   console.log("mail options", mailOptions)
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw new Error("Failed to send verification email");
  }
};
