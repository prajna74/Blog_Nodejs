const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/blog");
const articlesrouter=require("./routes/articles");
const article=require("./models/article");
const methodOveride=require("method-override");
app.use(express.urlencoded({extended:false}));
app.use(methodOveride("_method"));
app.use("/articles",articlesrouter);
app.get("/",async (req,res)=>{
    const articles=await article.find().sort({createdAt:-1});
   res.render("articles/index",{articles:articles});
    });
app.listen(5000);