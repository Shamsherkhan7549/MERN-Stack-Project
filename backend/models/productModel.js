import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    category:{
        type:Array,
        required:true
    },
    subCategory:{
        type:Array,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestseller:{
        type:Boolean,
        requred:true
    },
    date:{
        type:Number,
        required:true
    }
});

const PRODUCTMODEL = mongoose.model('PRODUCTMODEL', productSchema);

export default PRODUCTMODEL;