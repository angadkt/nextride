import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../../../middleware/nodeMailer/mailer.js";
import Providers from "../../../models/providersModel/providers.js";
import { comparePassword, hashPassword } from "../../../utils/bcrypt.js";
import { generateToken } from "../../../utils/jwt.js";
// import {  verificationToken } from "../../../utils/emailToken.js";

export const providerRegister = async (req, res) => {
  const { username, email, password, phone, address } = req.body;
  if (!username || !email || !password || !phone || !address) {
    return res.status(400).json({ success: false, message: `invalid input` });
  }
  const emailExist = await Providers.findOne({ email });
  if (emailExist) {
    return res
      .status(400)
      .json({ success: false, message: `email already exist` });
  }

  const phoneExist = await Providers.findOne({ phone });
  if (phoneExist) {
    return res
      .status(400)
      .json({ success: false, message: `mobile number already exist` });
  }
  //   ============================= image - cloudinary ============================
  const { image, idCard, license } = req.files;
  if (!image) {
    return res.status(400).json({ success: false, message: `profile needed` });
  }
  if (!idCard) {
    return res.status(400).json({
      success: false,
      message: `providers id required for verification`,
    });
  }
  if (!license) {
    return res.status(400).json({
      success: false,
      message: `driving license needed for verification`,
    });
  }
  //   ================================================

  // ------------------------ email verification token ------------------

  const VerificationToken = uuidv4();
  console.log("verificationToken", VerificationToken);

  const hashedPassword = await hashPassword(password);

  const newProvider = new Providers({
    username,
    email,
    password: hashedPassword,
    phone,
    address,
    image: image[0].path,
    idCard: idCard[0].path,
    licence: license[0].path,
    emailVerificationToken: VerificationToken,
  });

  await newProvider.save();
  await sendVerificationEmail(email, VerificationToken);

  res.status(200).json({
    success: true,
    message: `Application sent to the admin`,
    data: newProvider,
  });
};

// =========================================== -------------- =======================

export const providerLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "credentials not found" });
  }
  const existProvider = await Providers.findOne({ email });
  if (!existProvider) {
    return res.status(404).json({
      success: false,
      message: "user with this credentials not found",
    });
  }
  const ComparePassword = await comparePassword(
    password,
    existProvider.password
  );
  if (!ComparePassword) {
    return res
      .status(400)
      .json({ success: false, message: `password does not match` });
  }

  const isApproved = existProvider.isApproved;
  if (!isApproved) {
    return res.status(400).json({
      success: false,
      message: `your account will be ready in 24-hours`,
    });
  }

  const emailVerified = existProvider.emailVerified;
  if (!emailVerified) {
    return res.status(400).json({
      success: false,
      message: `verify your email `,
    });
  }

  const token = generateToken(existProvider._id);
  // console.log(token)

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  return res
    .status(200)
    .json({ success: true, message: `welcome to the rental bike community` });
};

// ========================================================

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const provider = await Providers.findOne({ emailVerificationToken: token });
  if (!provider) {
    return res
      .status(402)
      .json({ success: false, message: `provider with token not found` });
  }
  provider.emailVerified = true;
  provider.emailVerificationToken = null;
  await provider.save();
  return res
    .status(200)
    .json({ success: true, message: `Email verified successfully` });
};

//logout
export const providerLogout = async (req, res) => {
  res.clearCookie("token");

  return res
    .status(200)
    .json({ success: true, message: "provider Loggedout successfully" });
};
