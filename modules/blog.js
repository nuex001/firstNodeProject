const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    files:{
        type:String,
        required:true
    }
})
const commentSchema = new Schema ({
    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true  
    }
})
// creating a modal
// modal name should be the singular of the collection
const Blog = mongoose.model("Blog",blogSchema);
const Comment = mongoose.model("Comment",commentSchema);

module.exports = {
    Blog,
    Comment
}