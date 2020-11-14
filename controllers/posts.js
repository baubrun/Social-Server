import mongoose from "mongoose"
import Post from "../models/post.js"



export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new Post(post)
    try {
        await newPost.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}




export const getPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const updatePost = async (req, res) => {
    const post = req.body
    try {
        const {
            id: _id
        } = req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post found.")
        }
        const updatedPost = await Post.findByIdAndUpdate(_id, post, {
            new: true
        })
        return res.json(updatedPost)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}

export const deletePost = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No post with id: ${id}`);
        }
        await Post.findByIdAndRemove(id);
        return res.json({
            message: "Post deleted!"
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }

}

export const likePost = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No post with id: ${id}`);
        }
        const post = await Post.findById(id);
        const updatedPost = await Post.findByIdAndUpdate(id, {
            likes: post.likes + 1
        }, {
            new: true
        });

        return res.json(updatedPost);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })


    }
}