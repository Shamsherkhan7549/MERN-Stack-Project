import USERMODEL from '../models/userModel.js'

const addCart = async(req,res) => {
   try{
    const {itemId,size,userId} = req.body; 
    const userData = await USERMODEL.findById(userId)
    let cartData = await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] +=1;

        }else{
            cartData[itemId][size] = 1
        }
    }else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    const data = await USERMODEL.findByIdAndUpdate(userId, {cartData});

   }catch(error){
    console.log (error)
    res.json({success:false, message:error.message})
   }

};

const updateCart = async(req, res) => {
    try{
        const {userId, itemId, size, quantity} = req.body;
       
        const userData = await USERMODEL.findById(userId);
        let cartData =  userData.cartData;

        cartData[itemId][size] = quantity;

        const updatedData = await USERMODEL.findByIdAndUpdate(userId, {cartData});
        await updatedData.save();

        res.json({success:true, message:"Cart Updated"})

    }catch(error){
        console.log (error)
        res.json({success:false, message:error.message})
    }
};

const getCart = async(req, res) => {
    try{

        const {userId} = req.body;
        const userData = await USERMODEL.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});

    }catch(error){
        console.log(error);
        res.json({success:true, message:error.message})
    }

};
export {addCart,updateCart,getCart}