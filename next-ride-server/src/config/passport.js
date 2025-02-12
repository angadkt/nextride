// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import dotenv from "dotenv";
// import Users from "../models/userModel.js"; // Adjust the path as per your project structure
// import main from "../../server.js";

// dotenv.config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       await main()
//       try {
//         let user = await Users.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           user = await Users.create({
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             googleId: profile.id,
//             provider: "google",
//           });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );


// passport.serializeUser((user,done)=>{
//   done(null, user._id)
// })

// passport.deserializeUser(async(id,done)=>{

//   const user = await Users.findById(id)
//   done(null, user)
// })


// export default passport