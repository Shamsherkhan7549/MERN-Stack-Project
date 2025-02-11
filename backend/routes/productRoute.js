import express from 'express';
import {addProduct,listProduct, singleProduct, removeProduct} from '../controllers/productController.js';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import adminAuth from '../middlewares/adminAuth.js';

 const upload = multer({storage});

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addProduct);
productRouter.post('/single',singleProduct)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.get('/list',listProduct)

export default productRouter
