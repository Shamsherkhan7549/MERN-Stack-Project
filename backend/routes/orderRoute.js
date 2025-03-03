import express from 'express';
import {placeOrder,placeOrderStripe, placeOrderRazorpay, allOrders, userOrders,updateStatus, verifyStripe, verifyRazorpay} from  '../controllers/orderController.js';
const orderRouter = express.Router();
import adminAuth from '../middlewares/adminAuth.js';
import auth from '../middlewares/auth.js';

//Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment Features
orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);
orderRouter.post('/stripe', auth, placeOrderStripe);

//User Features
orderRouter.post('/userorders', auth, userOrders);

//Verify payment
orderRouter.post('/verifyStripe',auth, verifyStripe)
orderRouter.post('/verifyRazorpay',auth, verifyRazorpay)
export default orderRouter


