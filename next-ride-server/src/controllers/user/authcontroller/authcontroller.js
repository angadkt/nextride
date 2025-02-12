import Admin from "../../../models/adminmodel/admin.js";
import Users from "../../../models/authmodel/users.js";
// import Providers from "../../../models/providersModel/providers.js";
import { comparePassword, hashPassword } from "../../../utils/bcrypt.js";
import { generateToken } from "../../../utils/jwt.js";

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

// export const googleAuth = async (req, res) => {
//   console.log("hello")
//   const user = req.user;

//   const token = generateToken(user._id);

//   res.cookie("token", token,{
//     httpOnly: true,
//     secure: false, // Secure in production
//   })

//   res.redirect('http://localhost:3000/')
// };


export const googleAuth = async (req, res) => {
  const { email, name, image, googleId } = req.body;

  try {
    let user = await Users.findOne({ googleId });

    if (!user) {
      user = await Users.create({ googleId, email, name, image });
    }

    res.status(200).json({success:true, message:'google authenticatin successfull' ,data:user });
    res.redirect("http://localhost:3000/")
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};