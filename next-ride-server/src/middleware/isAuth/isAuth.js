import jwt from 'jsonwebtoken'


export const isAuthenticate = (req,res, next) => {
    console.log("req check", req.cookies)
    const token = req.cookies.token
    console.log("token check", req.cookies)
    if(!token) return res.status(401).json({success:false, message:`token required`})

    jwt.verify(token, process.env.TOKEN_SECRET, (err,decoded) => {
        if(err){
            return res.status(403).json({success:false, message:`token verification failed`})
        }
        req.user = decoded
        next()
    } )
}