const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bms');
const blogSettingSchema=mongoose.Schema({
    blog_title:{
        type:String,
        required:true
    },
    blog_logo:{
        type:String,
        required:true
    },
    blog_description:{
        type:String,
        required:true
    }
});

const blogSetting= mongoose.model('blogSetting',blogSettingSchema);
module.exports=blogSetting;

