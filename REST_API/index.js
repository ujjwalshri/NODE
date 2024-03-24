const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const mongoose = require('mongoose')
const PORT = 8002;
const fs = require('fs');

//Connection 
mongoose.connect('mongodb://127.0.0.1:27017/myDataBase').then(()=>console.log("Mongo db connected")).catch((err)=> console.log(err))




//Schema 
const userSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required : true,
    },
    last_name: {
        type : String,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    jobTitle : {
        type : String,
    },
    gender : {
        type: String,
    },
    
},{timestamps:true});

//Model 
const User = new mongoose.model('user', userSchema);



// middle ware - plugin
app.use(express.urlencoded({extended:false}));
// routes 
app.get('/api/users', async(req,res)=>{
    const allUsers = await User.find({});
    res.setHeader("X-myName","ujjwal Shrivastava");// This is a custom header 
    return res.json(allUsers);
})
app.use((req, res, next)=>{
    fs.appendFile("log.txt",`\n ${Date.now()} ${req.method} ${req.ip} ${req.path}`, (err, data)=>{
        next();
    })
})
app.get('/users' ,async (req,res)=>{
    const allUsers = await User.find({});
    let html = `
    <ul>
    ${allUsers.map(user => `<li>${user.first_name} - ${user.email}<li>`).join("")}
    <ul>
    `
    return res.send(html);
})



app.route('/api/users/:id').get( async(req,res)=>{

    let user =  await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({err:"user not found"});
    }
    return res.json(user);
}).patch(async(req,res)=>{
    //todo : we have to add a new user
    const user= await User.findByIdAndUpdate(req.params.id, {last_name:"ullu"});
    return res.status(202).json({mssg : "sucess"});
}).delete(async(req, res) => {
    // Get the ID of the user to be deleted from request params
    
    
    // Find the index of the user with the given ID in the array
    const user = await User.findByIdAndDelete(req.params.id);

    // If the user exists in the array, remove it
    
   return res.status(200).json({mssg : "deleted"});
});


app.post('/api/users' , async(req,res)=>{
    //todo : we have to add a new user
    const body = req.body;
    if(!body || !body.first_name || !body.email){
        return res.status(400).json({msg:"First name , last name are required"});
    }
    const result = await User.create({
        first_name :body.first_name,
        last_name : body.last_name,
        email : body.email,
        gender: body.gender,
        jobTitle : body.jobTitle,
    })
    return res.status(201).json({mssg : "user created"});
});

app.listen(PORT,()=>console.log(`Server is started on the port ${PORT}`))