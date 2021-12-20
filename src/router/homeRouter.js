const express=require("express");
const homeRouter=express.Router();
const bcrypt=require("bcrypt")
const registerDb=require("../model/registerDb")
const loginDb=require("../model/loginDb")
const jwt=require("jsonwebtoken")
homeRouter.get("/home",(req,res)=>{
  res.render("index")
})
homeRouter.get("/",(req,res)=>{
  res.render("register")
})
homeRouter.get("/login",(req,res)=>{
  res.render("login")
})
homeRouter.post("/",(req,res)=>{

  bcrypt.hash(req.body.password,10,(error,data)=>{
    if(error){
      console.log(error)
    }
    else
    {
      console.log(data)
    }
    let loginitems={
      username:req.body.username,
      password:data,
      
    }
    const loginModel= loginDb(loginitems);
      loginModel.save().then(()=>{
        loginDb.findOne({username:loginitems.username}).then(function (details){
          var id=details._id;
          let registerData={
            login_id:id,
            name:req.body.name,
            email:req.body.email,
            number:req.body.number
          }
          const registerModel=registerDb(registerData);
          registerModel.save().then(datas=>{
            console.log(datas)
            res.redirect("/login");
          })
        })
      })
  
  })
  })
  homeRouter.post("/login",(req,res)=>{
    console.log(req.body.username)
    loginDb.findOne({username:req.body.username}).then((logindata)=>{
      console.log("datas are:"+logindata)
      if(logindata)
      {
      bcrypt.compare(req.body.password,logindata.password).then((dataaa)=>{
        console.log(dataaa)
        if(dataaa)
        {
          console.log("correct")
          registerDb.findOne({login_id:logindata._id}).then((registerDetails)=>{
            console.log(registerDetails)
            const token=jwt.sign({name:registerDetails.name,login_id:registerDetails.login_id,role:logindata.role},"secret key")
          console.log(token)
          // res.redirect("/home")
          res.render("index",{registerDetails,title:"Home"})
          })
        }
        else
        {
          console.log("not correct")
        }
      })
    }
    else
    {
      console.log(" user not found")
    }
    })
  })

module.exports=homeRouter