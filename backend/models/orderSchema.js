import mongoose from "mongoose";
const {Schema} = mongoose;

const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },

    items:{
        type:Array,
        required:true
    },
    
    amount:{
        type:Number,
        required:true
    },
    
    address:{
        type:Object,
        required:true
    },
    
    status:{
        type:String,
        default:'Order Placed',
        required:true
    },

    paymentMethod:{
        type:String,
        required:true
    },

    payment:{
        type:Boolean,
        defaule:false,
        required:true
    },

    date:{
        type:Number,
        required:true
    }

});

const ORDERMODEL = mongoose.model('ORDERMODEL', orderSchema);

export default ORDERMODEL;