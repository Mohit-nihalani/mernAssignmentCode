const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/equalAssignment")
.then((result)=>{console.log("connection success")})
.catch((err)=>{console.log("not connected",err)});

const Data = new mongoose.Schema({
    name:String,
    value:String
})

const NumbersOperands = mongoose.model('edata',Data);

app.get('/',(req,res)=>{
    NumbersOperands.find((err,result)=>{
        if(!err)
        {
            res.send(result);
        }
        else{
            console.log(err)
        }
    })
})


app.listen('3030',(req,res)=>{
    console.log("App is up and running at port 3030");
})