const express=require("express")
const app=express()
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
  app.set("views",'./src/view');
  const homeRouter=require("./src/router/homeRouter");
app.use("/",homeRouter)
app.listen(1234,()=>{
  console.log("server is listening...http://localhost:1234")
})