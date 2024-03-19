const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

// routes 
app.get('/api/users', (req,res)=>{
    return res.json(users);
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
    return res.json(user);
}).patch((req,res)=>{
    //todo : we have to add a new user
    return res.json({status : pending});
}).delete((req,res)=>{
    //todo : we have to add a new user
    return res.json({status : pending});
})

app.post('/api/users' , (req,res)=>{
    //todo : we have to add a new user
    return res.json({status : pending});
})

app.listen(PORT,()=>console.log(`Server is started on the port ${PORT}`))