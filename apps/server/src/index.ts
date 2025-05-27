import express from 'express'
import { createAdmin, getUser } from './auth';
import userRouter from './routes/userRoutes';
import bidRouter from './routes/bidRoutes';
import transporterRouter from './routes/transporterRoutes';
import bidOfferRouter from './routes/bidOfferRoute';
import dealRouter from './routes/dealRoutes';
import cors from 'cors';

const app = express()
app.use(cors({
    origin:"*"
}));

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/bid",bidRouter)
app.use("/api/transporter",transporterRouter)
app.use("/api/bid-offer",bidOfferRouter)
app.use("/api/deal",dealRouter)


app.get("/", (req, res) => {
    res.send("hello world")
    
    
})


app.get("/private/admin", (req, res) => {
    try {
       createAdmin("admin@makebid.com", "password123", "admin")
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(3001, () =>{
    console.log("server is running smoothly on port 3001")
})