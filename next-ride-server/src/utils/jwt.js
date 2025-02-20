import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
    return jwt.sign({_id:userId}, process.env.TOKEN_SECRET)
}













// jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//     expiresIn: "7d",
//   });