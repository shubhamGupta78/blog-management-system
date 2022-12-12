const Joi= require('joi');
const expressLayouts=require('express-ejs-layouts')
const express=require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/user_management');
//require('dotenv').config();
//const path=require('path')
const app=express();
app.set('view engine','ejs');
//app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
//app.set('layout','./layouts/main')
//const routes=require('./server/routes/recipeRoutes.js')
// app.use('/',routes);

const routes=require('./server/routes/userRoutes.js');
app.use('/',routes);

const port=process.env.PORT|| 3000;
app.listen(port,()=>console.log(`listening to ${port}`));
