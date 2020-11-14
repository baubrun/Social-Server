import mongoose from "mongoose"



const PostSchema = mongoose.Schema({
    title: String,
    message: String,
    author: String,
    tags: [String],
    file: String,
    likes: {
        type: Number,
        default: 0,
    },
    DateCreated: {
        type: Date,
        default: new Date()
    }
})


const Post = mongoose.model("Post", PostSchema)

export default Post