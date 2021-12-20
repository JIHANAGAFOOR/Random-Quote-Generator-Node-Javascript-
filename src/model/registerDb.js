const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/TaskNode?retryWrites=true&w=majority",()=>{
  console.log("database connected")
})
const schema=mongoose.Schema;
const registerSchema= new schema({
  login_id:{type:mongoose.Schema.Types.ObjectId, ref:"signin"},
  name:{ type:String},
  email:{type:String},
  number:{type:Number},
})
const registerDb=mongoose.model("signup",registerSchema)
module.exports=registerDb