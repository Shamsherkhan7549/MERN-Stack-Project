import USERMODEL from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//Route for user login
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await USERMODEL.findOne({email});
        if(!user){
            return res.json({success:false, message:'Email or password is inncorrect~'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            return res.json({succes:false, message:" password is inncorrect~"})
        }
       
        const token = createToken(user._id);
        return res.json({success:true, token})

    }catch(err){
        console.log(err);
        return res.json({succes:false, message:err.message})
    }
}

//Route for register user
const registerUser = async(req, res) => {
    try{

        const {name,email, password} = req.body;
        console.log(name, email,password)
        //checking user already exist or not
        const exist = await USERMODEL.findOne({email})

        if(exist){
            return  res.json({success:false, message:"User email exits"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message: "Please enter a valid email"})
        }

        if(password.length<8){
            return res.status(404).json({success:false, message:"Please enter a strong password"})
            
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser =  new USERMODEL({name, email, password:hashedPassword});

        const user = await newUser.save();

        const token = createToken(user._id);

        return res.json({success:true, token});

    }catch(err){
        console.log(err)
       return res.json({success:false, message:err.message})

    }
}

//Route for admin login
 const adminLogin = (req, res) => {
    try{

        const {email, password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return  res.json({success:true, token})
        }else{
           return res.json({success:false, message:"invalid credentials"})
        }
    }catch(err){
        console.log(err)
       return res.json({success:true, message:err.message})
    }
}

export {loginUser, registerUser,adminLogin}