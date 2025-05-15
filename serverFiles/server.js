const express=require("express");
const app=express();
const cors=require("cors");
data={"message":"Res from server!"};

app.use(cors());
app.get('/api',(req,res)=>{
    res.json(data);
});

app.listen(3001,(err)=>{console.log("Server is listening!")});