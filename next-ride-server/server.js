import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './src/router/user/userRouter.js'
import cookieParser from 'cookie-parser'
import router from './src/router/admin/adminRouter.js'
// import passport from 'passport'
import Authrouter from './src/router/googleAuthroute/gooleAuthRoute.js'
import ProviderRouter from './src/router/providerRouter/providerRouter.js'
import sharedRouter from './src/router/sharedRoute/sharedRoute.js'

const app = express()
dotenv.config()
const Port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true}))

app.use(cookieParser())
// app.use(passport.initialize());
// app.use(passport.session())



export default async function main(){
    try {
        mongoose.connect('mongodb+srv://angadktofficial:N7L8gQp1x32wcZSx@cluster0.x0rll.mongodb.net/nextride?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connection successful")
    } catch (error) {
        console.log('error occured connection database',error)
    }
}
main()




//centralised error handling
app.use((err, req,res, next)=>{
    console.log("error:",err)
    res.status(500).json({success:false, message:`something went wrong ${err}`})
})



app.use('/api/user',userRouter)
app.use('/api/admin', router)
app.use('/api',Authrouter)
app.use('/api/provider', ProviderRouter)
app.use('/api/shared', sharedRouter)

app.listen(Port,()=>{
    console.log(`server connected to the ${Port}`)
})