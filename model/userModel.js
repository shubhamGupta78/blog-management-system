const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bms');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        default:''
    }
});

const user= mongoose.model('user',userSchema);
module.exports=user;

