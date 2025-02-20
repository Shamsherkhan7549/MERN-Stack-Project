import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send("api working")
})

//api endpoint
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order', orderRouter)

app.listen(port, ()=> {
    console.log('sever runnig on port '+ port)
})