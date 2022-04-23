const express = require("express");
const {Blog,Comment} = require("../modules/blog");

// creating router instances

const router = express.Router();

router.get("/", (req, res) => {

  const blog = {
    title: "Hello world",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ullam ex necessitatibus ducimus. In sit natus maxime veniam laboriosam, esse aspernatur, minima obcaecati beatae corrupti illum inventore, molestiae impedit fugiat!",
    files: "images/Guatemala-city-central-park.jpg",
  };
  const Comments = [
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente.",
      id: "1",
    },
    { comment: "how are you", id: "2" },
    { comment: "how are you2", id: "3" },
    { comment: "how are you3", id: "4" },
  ];
  res.render("blog", { title: "Blog", blog: blog, Comments: Comments });
});

// working for blog comment
router.post("/comments", (req, res) => {
  // console.log(req.body);
  const comment = new Comment ({
    comment:req.body.msg,
    postId:req.body.postId
  })
  comment.save()
  .then(result=>{
    res.json({msg:req.body.msg});
  })
  .catch(err=>{
    console.log(err);
  })
});

// getiing for blog
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then(result=>{
    // res.send(result);
    return result;
  }).then(result=>{
    Comment.find({postId:id})
    .then(data=>{
    // console.log(result);
  res.render("blog", { title: "Blog", blog: result, Comments: data });
    });
  })
  .catch(err=>{
    console.log(err);
  })
  
});

// deletting
router.delete("/:id",(req,res)=>{
  const id = req.params.id;
  // console.log(id);
  Blog.findByIdAndDelete(id)
  .then(result=>{
 res.json({msg:"success"});
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router;
