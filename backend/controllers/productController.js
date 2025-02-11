import {v2 as cloudinary} from 'cloudinary';
import PRODUCTMODEL from '../models/productModel.js'
//function for add product
const addProduct = async(req, res) => {
    try{        
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body
        const image1 = req.files.image1 ? req.files.image1[0]:undefined;
        const image2 = req.files.image2 ? req.files.image2[0]:undefined;
        const image3 = req.files.image3 ? req.files.image3[0]:undefined;
        const image4 = req.files.image4 ? req.files.image4[0]:undefined;
        const images = [image1, image2, image3, image4].filter(item=> item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async(item)=> {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return  result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            images: imageUrl ,
            date: Date.now()
        };
        const product = new PRODUCTMODEL(productData);
        const productCopy = await product.save();
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        return res.json({succes:true, message:"Product Added"})

    }catch(err){
        console.log(err);
        return res.json({sucsses:false, message:err.message})
    }
}

//function for list product
const listProduct = async(req, res) => {
    try{
        const products = await PRODUCTMODEL.find({});
        res.json({success:true, products})
    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
};


const removeProduct = async(req, res) => {
    try{

        const removedProduct = await PRODUCTMODEL.findByIdAndDelete(req.body.id);
        res.json({success:true, message:'product removed'})

    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
};

//function for single product info
const singleProduct = async(req, res) => {
    try{
       const singleProduct = await PRODUCTMODEL.findById(req.body.id) ;
       res.json({sucess:true, singleProduct})
    }catch(err){
        console.log(err);
        res.json({sucess:false, message:err.message})
    }
};

export {addProduct,listProduct, singleProduct, removeProduct}