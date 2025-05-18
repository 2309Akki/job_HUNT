import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path"

dotenv.config({})
const app= express()


const _diraName=path.resolve();
// Middle ware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true
    })
})


const PORT= process.env.PORT ||3000;


//API's
app.use("/api/v1/user",userRoute)
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_diraName,'/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_diraName,'frontend','dist','index.html'))
})
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port number ${PORT}`)
})
