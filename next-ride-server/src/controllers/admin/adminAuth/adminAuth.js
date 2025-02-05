import Admin from "../../../models/adminmodel/admin.js";
import { hashPassword } from "../../../utils/bcrypt.js";

export const adminRegister = async (req, res) => {
  const { email, password } = req.body;
  if (!email)
    return res.status(403).json({ success: false, message: `email not found` });

  if (!password)
    return res
      .status(403)
      .json({ success: false, message: `password not found` });

  const adminExist = await Admin.findOne({ email });
  if (adminExist)
    return res.status(403).json({ success: false, message: `admin exist` });

  const hashedPassword = await hashPassword(password);

  const admin = new Admin({
    email,
    password: hashedPassword,
  });
  await admin.save();
  return res.status(202).json({ success: true, message: `admin registered` });
};


// ============================================

export const adminLogout = async(req,res)=>{
  res.clearCookie("token",{
    httpOnly: true,
    secure:false,
  })
  return res.status(200).json({success:true, message:`admin logged out`})
}
