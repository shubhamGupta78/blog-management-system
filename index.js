const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bms');
const express=require('express');
const app=express();
app.set('view engine','ejs');
//app.use(expressLayouts);
var http=require('http').createServer(app);
var {Server}=require('socket.io');
var io=new Server(http,{});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const adminRoutes=require('./server/routes/adminRoutes');
const isBlog = require('./middleware/isBlog');
console.log("hi");
app.use(isBlog);
app.use('/',adminRoutes);
/*onst userRoutes=require('./server/routes/userRoutes');
app.use('/',userRoutes);*/
http.listen(3000,function(){
    console.log("server is running");
});
io.on("connection",function(socket){
    console.log("user connected");
    socket.on("new_post",function(formData){
        console.log(formData);
        console.log("hi shubham");
        socket.broadcast.emit("new_post",formData);
    });
    socket.on("new_comment",function(formData){
        console.log(formData);
        console.log("hi raju");
        socket.broadcast.emit("new_comment",formData);
    });
    socket.on("delete_post",function(postId){
        console.log(postId);
        console.log("hi kaju");
        socket.broadcast.emit("delete_post",postId);
    });

})


app.get('/',(req,res)=>{

    res.send('hi we are her');
});


