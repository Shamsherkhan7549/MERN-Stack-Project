import ORDERMODEL from "../models/orderSchema.js";
import USERMODEL from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay';

//Global Variables
const currency = 'inr';
const deliveryCharges = 10;

//Gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
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
    try{

        const {userId, items, amount, address} = req.body;
        const{origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'stripe',
            payment:false,
            date:Date.now()
        };

        const newOrder = new ORDERMODEL(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data:{
                currency: currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({ 
            price_data:{
            currency: currency,
            product_data: {
                name:'Delivery Charges'
            },
            unit_amount: deliveryCharges * 100,
        },
            quantity: 1,     
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?false=true&orderId=${newOrder._id}`, 
            line_items,
            mode:'payment'
        });

        res.json({success:true, session_url:session.url})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
};

//Verify Stripe
const verifyStripe = async(req, res) => {
    const {orderId, success, userId} = req.body;

    try{
        if(success == true){
            await ORDERMODEL.findByIdAndUpdate(orderId, {payment:true});
            await USERMODEL.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true})
        }else{
            await ORDERMODEL.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    }catch(error){
         console.log(error);
        res.json({success:false, message:error.message});
    }
}

//Placing orders using Razorpay Method
const placeOrderRazorpay = async(req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const{origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'razorpay',
            payment:false,
            date:Date.now()
        };

        const newOrder = new ORDERMODEL(orderData);
        await newOrder.save();

        const options = {
            amount: amount,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message });
            }
            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
};

//Verify Razorpay 
const verifyRazorpay = async(req, res) => {
    try{
        const {userId,razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await ORDERMODEL.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await USERMODEL.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true, message:"Payment Successful"})
        }else{
            res.json({success:false, message:"Payment failed"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false, message:"error.message"})
    }
}

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

export {placeOrder,placeOrderStripe,verifyStripe, placeOrderRazorpay,verifyRazorpay, allOrders, userOrders,updateStatus}