const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/TaskNode?retryWrites=true&w=majority",()=>{
  console.log("database connected successfully")
})
const schema=mongoose.Schema
const loginSchema=new schema({
  username:String,
  password:String
})
const loginDb=mongoose.model("Signin",loginSchema)
module.exports=loginDb;