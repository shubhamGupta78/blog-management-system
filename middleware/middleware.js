const isLoginUser=async(req,res,next)=>
{
    try{
            if(!req.session.userid)
            {
                res.redirect('./login');
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
const isLoginAdmin=async(req,res,next)=>
{
    try{
            if(!req.session.adminid)
            {
                res.redirect('./login');
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
const isLogout=async(req,res,next)=>
{
    try{
        
            if(req.session.userid)
            {
                console.log(req.session.userid);
                res.redirect('/blogPage');
            }
            else if(req.session.adminid)
            {
                console.log(req.session.adminid);
                res.redirect('/dashboard');
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


module.exports={
    isLoginUser,
    isLoginAdmin,
    isLogout
}