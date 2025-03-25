import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'

const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,  // Allow cookies to be sent with requests
};
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});
//for dynamic viewing of web page
const _dirname=path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('server is running on port 3000!!');
});
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use('/api/listing',listingRouter);
app.use(cors(corsOptions));

//on build creates a new folder "dist" in react vite & "build" in react
app.use(express.static(path.join(_dirname,'/client/dist')));

app.get('*',(req,res)=>{ // all paths other than above used paths
    res.sendFile(path.join(_dirname,'client','dist','index.html')); //runs index.html after dist folder is built after npm run build 
})

//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});