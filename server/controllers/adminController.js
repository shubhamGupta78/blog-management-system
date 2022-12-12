const fetch=require('node-fetch');
const cron=require('node-cron');
//let csc = require('country-state-city').default;
const blogSetting=require('../../model/blogSettingModel');
const user=require('../../model/userModel');
const blogPost=require('../../model/blogPost');
const bcryt=require('bcrypt');
const getData=async(req,res)=>{

    cron.schedule("* * * * * *",function(){

             console.log("hi");

    })

}

const addComments=async(req,res)=>{
    console.log(req.body.id);
    const com={
        email:req.body.email,
        comment:req.body.comment
    }

    const add=await blogPost.findOneAndUpdate({_id:req.body.id},{$push:{comments:com}},{upsert:true});
    if(add)
    {
        console.log(add.title);
        res.status(201).send({success:true,message:'comment added successfully'});
    }

}
const blogDetails=async(req,res)=>{
    try
    {
               
        const getBlog=await blogPost.findOne({_id:req.query.id});
        if(getBlog)
        {
               
            res.render('./blogDetails',{
                    post:getBlog
            });
        }
    }
    catch(error)
    {
        console.log(error.message);
    }

}
const deletePost=async(req,res)=>{
    try{
         console.log("sdfghjk");
        const postDelete=await blogPost.deleteOne({_id:req.body.id});
        if(postDelete)
        {
            res.status(201).send({success:true,message:'post deleted successfully'});
        }

    }
    catch(error)
    {
        res.status(400).send({success:true,message:error.message});
    }
}
const showPosts=async(req,res)=>{
    try{
        
    const data=await blogPost.find();
    if(data)
    {
        console.log(data);
        console.log("hi");
            res.render('./showPosts',{
                posts:data
            });
    }
    else
    {
        res.render('./showPosts',{
            message:'No blogs Posted'
        });
    }
}
catch(error)
{
    console.log(error.message);
}
}
const loadPosts=async(req,res)=>{
    try{
        
    const data=await blogPost.find();
    if(data)
    {
        console.log(data);
        console.log("hi");
            res.render('./blogPage',{
                posts:data
            });
    }
    else
    {
        res.render('./blogPage',{
            message:'No blogs Posted'
        });
    }
}
catch(error)
{
    console.log(error.message);
}
}
const saveBlog=async(req,res)=>{
    try{
    console.log(req.body);
    const savePost=new blogPost({
        title:req.body.title,
        description:req.body.description

    });
    const checkSaveBlog=await savePost.save();
    if(checkSaveBlog)
    {
        console.log("shubham");
        res.status(201).send({success:true,message:'post added successfully',_id:checkSaveBlog._id});
    }
    else
    {
        console.log("unable to insert data");
    }
}
catch(error)
{
    console.log(error.message);
}


}
const insertUser=async(req,res)=>{
    try{
           const password=await securePassword(req.body.password);
           const checkUser=await user.findOne({email:req.body.email});
           if(checkUser)
           {
            res.redirect('./register',{message:'user already exists please signup with a different mail'});
           }
           const newSave=new user({
               name:req.body.name,
               email:req.body.email,
               password:password,
               isAdmin:0
           });

           const checkSave=await newSave.save();
           if(checkSave)
           {
               
               res.redirect('./login');
           }
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const register=async(req,res)=>{
    try{
            res.render('./register');
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const dashboard=async(req,res)=>{
    try{
            res.render('./dashboard',{message:'welcome to dashboard'});
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const postBlog=async(req,res)=>{
    try{
            res.render('./postBlog',{message:'welcome to blogging website'});
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const securePassword=async(password)=>
{
    try{
    const pass=await bcryt.hash(password,10);
    console.log(pass);
    return pass;
    }
    catch(error)
    {
        console.log(error.message);
    }
}
 const checkUser=async(req,res)=>{
     try{
            const findUser=await user.findOne({email:req.body.email});
            if(findUser)
            {
                console.log(findUser.name);
               
                const password=req.body.password;
                console.log(password);
                console.log(findUser.password);
                const checkUserpassword=await bcryt.compare(password,findUser.password);
                console.log(checkUserpassword);
                if(checkUserpassword)
                {
                        if(findUser.isAdmin==1)
                        {
                            req.session.adminid=findUser._id;
                            console.log(req.session.adminid);
                            res.redirect('./dashboard');
                        }
                        else
                        {
                            
                            req.session.userid=findUser._id;
                            console.log(req.session.userid);
                            res.redirect('./blogPage');
                        }
                
                }
                else
                {
                    res.render('./login',{message:'email id or password is incorrect'});
                }
            }
     }
     catch(error)
     {
         console.log(error.message);
     }
 }

const login=async(req,res)=>{
    
    try{
        res.render('./login');
    }
    catch(error)
    {
        console.log(error.message);
    }
    
}
const saveData=async(req,res)=>{
    try{
        console.log(req.body);
        const blogDetails=new blogSetting({
            blog_title:req.body.title,
            blog_logo:req.body.logo,
            blog_description:req.body.description
        });
        const blog=await blogDetails.save();
        if(blog)
        {
            console.log("data uploded successfully");
        }
        else
        {
            console.log("data not uploaded");   
        }
        const password=await securePassword(req.body.password);
        const userData=new user({
            name:req.body.name,
            email:req.body.email,
            password:password,
            isAdmin:1

        });
        const uploaded=await userData.save();
        if(uploaded)
        {
                res.redirect('./login');
        }
    }
   
    catch(error)
    {
        console.log(error.message);
    }
}
const blogSetup=async(req,res)=>{
   try{
    
        var blogfind=await blogSetting.find({});
        if(blogfind.length>0)
        {
            res.redirect('/login');
        }
        else{
            res.render('./blogSetup');
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
   
}
module.exports={
    
    blogSetup,
    login,
    saveData,
    checkUser,
    register,
    dashboard,
    postBlog,
    insertUser,
    saveBlog,
    loadPosts,
    showPosts,
    deletePost,
    blogDetails,
    addComments,
    getData
}
