
const blogSetting=require('../model/blogSettingModel');

const isBlog=async(req,res,next)=>{
    try{
            console.log(req.body);
        const findData= await blogSetting.find({});
        if(findData.length==0 && req.originalUrl!="/blogSetup")
        {
            res.redirect('/blogSetup');
        }
        else
        {
            next();
        }

    }
    catch(error)
    {
        console.log(error.message);
    }
   
}

module.exports=isBlog;