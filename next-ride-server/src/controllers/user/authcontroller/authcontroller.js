import Admin from "../../../models/adminmodel/admin.js";
import Users from "../../../models/authmodel/users.js";
import { comparePassword, hashPassword } from "../../../utils/bcrypt.js";
import { generateToken } from "../../../utils/jwt.js";
import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv"

dotenv.config()


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  if (!name || !email || !password || !mobile)
    return res.status(400).json({ success: false, message: `invalid input` });

  const existEmail = await Users.findOne({ email });
  // console.log("email check",existEmail)
  if (existEmail)
    return res
      .status(400)
      .json({ success: false, message: `user with this email already exist` });

  const existNumber = await Users.findOne({ mobile });
  if (existNumber)
    return res
      .status(400)
      .json({ success: false, message: `user with this number already exist` });

  const hashedPassword = await hashPassword(password);

  const newUser = new Users({
    name,
    email,
    mobile,
    password: hashedPassword,
    // provider:"credentials",
  });
  await newUser.save();
  return res.status(200).json({
    success: true, 
    message: `user registered successfully`,
    data: newUser,
  });
};

// =========================================================

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, message: `enter the email correctly` });

  if (!password)
    return res
      .status(400)
      .json({ success: false, message: `enter the appropriate password` });

  // checking in userSchema
  const userExist = await Users.findOne({ email });

  // =========================================================================
  //checking in adminSchema
  const isAdmin = await Admin.findOne({ email });
  if (isAdmin) {
    const passwordCheck = await comparePassword(password, isAdmin.password);
    if (passwordCheck) {
      const tokenAdmin = generateToken(isAdmin._id);
      res.cookie("token", tokenAdmin, {
        httpOnly: true,
        secure: false,
      });
      return res.status(202).json({
        success: true,
        message: `admin loginned successfully`,
        data: isAdmin,
        role: "admin",
      });
    }
  }
  // ===============================================================================

  if (!userExist)
    return res
      .status(404)
      .json({ success: false, message: `user does not exist` });
  const token = generateToken(userExist._id);

  const passwordCheck = await comparePassword(password, userExist.password);
  if (!passwordCheck) {
    return res
      .status(400)
      .json({ success: false, message: `password does not match` });
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Secure in production
  });

  return res.status(200).json({
    success: true,
    message: `user loggined successfully`,
    data: userExist,
    token: token,
  });
};

// =============================================================

export const googleAuth = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  // Verify Google token
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    return res.status(401).json({ error: "Invalid Google token" });
  }

  const { email, name, sub, picture } = payload; // Extract user details

  // Check if user exists in DB
  let user = await Users.findOne({ email });
  if (!user) {
    // Create a new user if not found
    user = new Users({
      googleId: sub,
      email,
      name,
      profilePicture: picture,
    });
    await user.save();
  }

  // Generate JWT token
  const authToken = generateToken(user._id,{
    expiresIn: "7d",
  })

  res.cookie("token", authToken, {
    httpOnly: true,
    secure: false, // Secure in production
  })

  // Send the token in response
  return res.status(200).json({
    message: "Google Login Successful",
    token: authToken,
    user: { id: user._id, email: user.email, name: user.name },
  });

};