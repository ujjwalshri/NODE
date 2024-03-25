const express = require("express");

const app = express();

const PORT = 8002;
const {logReqRes}= require('./middlewares/index');
const userRouter = require('./routes/user')
const {connectMongoDb} = require('./connection');
//Connection 
connectMongoDb('mongodb://127.0.0.1:27017/myDataBase').then(()=>console.log("mongo connected"));



// middle ware - plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes('log.txt'));
// Routes 
app.use('/api/users',userRouter);

app.listen(PORT,()=>console.log(`Server is started on the port ${PORT}`))