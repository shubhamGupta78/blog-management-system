const express=require('express');
const adminRoutes=express();
const multer=require('multer');
const config=require('../../config/config');
//const dotenv = require('dotenv').config()
adminRoutes.use(express.json());
session=require('express-session');
//const config=require('../../config/config');
//user_route.use(express.static('public'));
const adminController=require('../controllers/adminController');
const {isLoginUser,isLoginAdmin,isLogout}=require('../../middleware/middleware');
adminRoutes.use(session({
    secret:config.sessionSecret,
    resave: false,
    saveUninitialized: true,         
    is_logged_in: false,
}))
//const insertUser=require('../controllers/userControllers');
const bodyParser=require('body-parser');
adminRoutes.use(bodyParser.json());
adminRoutes.use(bodyParser.urlencoded({extended:true}));

adminRoutes.set('view engine','ejs');
adminRoutes.set('views','./views');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,path.join(__dirname,'..public/images'))
    },
    filename:function(req,file,cb)
    {
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const upload=multer({storage:storage});

adminRoutes.get('/login',isLogout,adminController.login);
adminRoutes.post('/login',adminController.checkUser);
adminRoutes.get('/blogSetup',adminController.blogSetup);
adminRoutes.post('/blogSetup',adminController.saveData);
adminRoutes.get('/register',isLogout,adminController.register);
adminRoutes.post('/register',adminController.insertUser);
adminRoutes.get('/dashboard',isLoginAdmin,adminController.dashboard);
adminRoutes.get('/postBlog',isLoginAdmin,adminController.postBlog);
adminRoutes.post('/postBlog',adminController.saveBlog);
adminRoutes.get('/blogPage',adminController.loadPosts);
adminRoutes.get('/showPost',adminController.showPosts);
adminRoutes.post('/deletePost',adminController.deletePost);
adminRoutes.get('/blogDetails',adminController.blogDetails);
adminRoutes.post('/addComments',adminController.addComments);
adminRoutes.get('/getData',adminController.getData);

module.exports=adminRoutes;
 