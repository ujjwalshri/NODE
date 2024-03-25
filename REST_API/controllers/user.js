const User = require('../models/user');
const fs = require('fs');

async function handleGetAllUsers(req, res){
    const allUsers = await User.find({});
    return res.json(allUsers);
}
async function getUserById(req, res){
    let user =  await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({err:"user not found"});
    }
    return res.json(user);
}
async function handleUpdateUserById(req,res){
    const user= await User.findByIdAndUpdate(req.params.id, {last_name:"ullu"});
    return res.status(202).json({mssg : "sucess"});
    
}
async function handleDeleteUserByID(req,res){
    // Get the ID of the user to be deleted from request params
    
    
    // Find the index of the user with the given ID in the array
    const user = await User.findByIdAndDelete(req.params.id);

    // If the user exists in the array, remove it
    
   return res.status(200).json({mssg : "deleted"});
}

async function handleCreateNewUser(req,res){
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
     return res.status(201).json({mssg : "user created" , id:result._id });
}
module.exports ={
    handleGetAllUsers,
    getUserById,
    handleUpdateUserById,
    handleDeleteUserByID,
    handleCreateNewUser,
}