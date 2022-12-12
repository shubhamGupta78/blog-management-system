const express=require('express');
const app=express();
const request=require('supertest');
const adminControllers=require('../controllers/adminController');
const adminRoutes=require('./adminRoutes');
//app.use(express.json());
app.use(adminRoutes);
test('toContain',async()=>{
    await request(app)
    .get('/blog')
    .expect(200)
    .then(res => {
         expect( typeof res.body=='object')
        //expect(res.body).toEqual('blog2');
    })
})


