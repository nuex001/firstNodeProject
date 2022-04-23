// requiring some frame work
const { render } = require("ejs");
const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const blogRoutes = require("./routes/blogroutes.js");
const upload = require("express-fileupload");

const { Blog, Comment } = require("./modules/blog");
// blog01
// const multer = require("multer");
const app = express();
// connect to mongodb

const dbURL =
  "mongodb+srv://nuel001:blog01@blo.73tip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); //setting my own directory

// middleware & files
app.use(express.urlencoded({ extended: true })); //used for accepting form data
app.use(express.static("assets"));
app.use(upload());

app.get("/", (req, res) => {
  Blog.find()
  .then(result=>{
    // res.send(result)
  res.render("index", { title: "Home", blogs: result });
})
  .catch(err=>{
    console.log(err);
  })
});

app.get('/re',(req,res)=>{
  res.redirect("/");
})

app.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// working for search
app.post("/search", (req, res) => {
  console.log(req.body);
});

app.post("/upload", function (req, res) {
  console.log(req.body.title);
  if (req.files) {
    // console.log(req.files);
    const file = req.files.file;
    const names = file.name.split(".");
    const ext_names = names[names.length - 1];
    const fileName = req.body.title
      ? req.body.title + "." + ext_names
      : uniqid() + "." + ext_names;
    const dirPath = "images/" + fileName;
    const mvPath = "./assets/images/" + fileName;
    file.mv(mvPath, function (err) {
      if (err) {
        console.log(err);
      } else {
       const blog = new Blog({
          title: req.body.title,
          content: req.body.Post,
          files: dirPath,
        });
        blog.save()
        .then(result=>{
        res.send(result);
        })
        .catch(err=>{
          console.log(err);
        })
        res.redirect("/re");
      }
    });
  }

});

// scoping to a certain url,incase the url changes
app.use("/blog", blogRoutes);

// listenning to sever
// app.listen(3000);
