const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const mongoose = require('mongoose')
const PORT = 8002;
const fs = require('fs');
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
})




// middle ware - plugin
app.use(express.urlencoded({extended:false}));
// routes 
app.get('/api/users', (req,res)=>{
    res.setHeader("X-myName","ujjwal Shrivastava");// This is a custom header 
    return res.json(users);
})
app.use((req, res, next)=>{
    fs.appendFile("log.txt",`\n ${Date.now()} ${req.method} ${req.ip} ${req.path}`, (err, data)=>{
        next();
    })
})
app.get('/users' , (req,res)=>{
    let html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} <li>`).join("")}
    <ul>
    `
    return res.send(html);
})



app.route('/api/users/:id').get((req,res)=>{
    let id = Number(req.params.id);
    let user = users.find((user) => user.id === id );
    if(!user){
        return res.status(404).json({err:"user not found"});
    }
    return res.json(user);
}).patch((req,res)=>{
    //todo : we have to add a new user
    return res.status(503).json({status : "Not implemented"});
}).delete((req, res) => {
    // Get the ID of the user to be deleted from request params
    const id = req.params.id;

    // Find the index of the user with the given ID in the array
    const index = users.findIndex(user => user.id === Number(id));

    // If the user exists in the array, remove it
    if (index !== -1) {
        users.splice(index, 1);

        // Write the updated array back to the JSON file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to delete user." });
            }
            return res.json({ status: "success", message: "User deleted successfully." });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found." });
    }
});


app.post('/api/users' , (req,res)=>{
    //todo : we have to add a new user
    const body = req.body;
    if(!body || !body.first_name || !body.email){
        return res.status(400).json({msg:"First name , last name are required"});
    }
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users),(err, data)=>{
        return res.json({status:"pending"});
    })
    return res.status(201).json({status : "success" , id: users.length});
});

app.listen(PORT,()=>console.log(`Server is started on the port ${PORT}`))