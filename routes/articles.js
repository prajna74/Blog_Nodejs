const express=require("express");
const { render } = require("express/lib/response");

const router=express.Router();
const article=require("./../models/article")

router.get("/new",(req,res)=>{
    res.render("articles/new",{articles:new article()});
})

router.put("/:id",async (req,res)=>{
    const arrt= await article.findById(req.params.id);
    arrt.title=req.body.title;
    arrt.description=req.body.description;
    arrt.markdown=req.body.markdown;
    try{
         arrt.save();
      res.redirect(`/articles/${arrt.id}`);
    }catch(e)
    {
        console.log(e);
        res.redirect("/",{articles:arrt});
    }
})

router.get("/edit/:id",async (req,res)=>{
       const aa= await article.findById(req.params.id);
          res.render("articles/edit",{articles:aa});
})

router.get("/:id",async (req,res)=>{
    const a= await article.findById(req.params.id);
    if(a==null)
    res.redirect("/");
    res.render("articles/show",{articless:a}); 
})
router.post("/",async (req,res)=>{
        const art=new article({
          title:req.body.title,
          description:req.body.description,
          markdown:req.body.markdown
        });
        try{
        await art.save();
        res.redirect(`/articles/${art.id}`);
        }catch(error)
        {
            res.render("articles/new",{articles:art});
        }
});

router.delete("/:id",async (req,res)=>{
   await article.findByIdAndDelete(req.params.id);
   res.redirect("/");
})
module.exports=router;