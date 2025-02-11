import ORDERMODEL from "../models/orderSchema.js";
import USERMODEL from "../models/userModel.js";

//Placing orders using COD Method
const placeOrder = async(req, res) => {
    try{

        const{userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'cod',
            payment:false,
            date:Date.now()
        };

        const newOrder = new ORDERMODEL(orderData);
        await newOrder.save();

        await USERMODEL.findByIdAndUpdate(userId, {cartData:{}});

        res.json({success:true,newOrder })

    }catch(error){
        console.log(error.message)
        res.json({success:true, message:error.message})

    }
};

//Placing orders using Stripe Method
const placeOrderStripe = async(req, res) => {

};

//Placing orders using Razorpay Method
const placeOrderRazorpay = async(req, res) => {

};

//All Orders data for Admin Panel
const allOrders = async(req,res)=>{
    try{
        const {userId} = req.body
        
        const orders = await ORDERMODEL.find(userId);
        res.json({success:true, orders})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
};

//User Order Data For Frontend
const userOrders = async(req,res)=>{
    try{
        const {userId} =  req.body;
        const orders = await ORDERMODEL.find({userId})
        res.json({success:true, orders})
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
};

//Update Order status from Admin Panel
const updateStatus = async(req,res)=>{
    try{
        const {orderId, status} = req.body;
        console.log(status)
        const order = await ORDERMODEL.findByIdAndUpdate(orderId, {status:status});

        res.json({success:true, message:"Status Updated"})
        console.log(order)
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})

    }
};

export {placeOrder,placeOrderStripe, placeOrderRazorpay, allOrders, userOrders,updateStatus}