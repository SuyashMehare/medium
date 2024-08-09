import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export const getAllBlogs = async (c : Context) => {

    // c.executionCtx.waitUntil
    return c.json({success:true, message:"getAllbBlogs", userId: c.get('userId')},200)
}

export const getBlogById = async (c : Context) => {

    const prisma : PrismaClient = c.get("prisma")
    const userId : string = c.get("userId") 

    try {


        return c.json({success:true, message:"getBlogByid",userId: c.get('userId')},200)
    } catch (error) {
        
    }
}


interface Post {
    title: string,
    content: string,
    published ? : boolean
}

interface UpdatePost {
    title?: string,
    content?: string,
    published ? : boolean
}

export const uploadBlog = async (c : Context) => {
    
    const prisma : PrismaClient = c.get("prisma")
    const userId : string = c.get("userId") 


    const payload : Post= await c.req.json()

    try {

        const createdPost = await prisma.post.create({
            data:{
                title : payload.title,
                content: payload.content,
                published: payload.published,
                authorId: userId
            },
            select:{
                id:true
            }
        })      

        return c.json({success:true, postId: createdPost, message:"Post uploaded succefully" },200)
        
    } catch (error) {
        
        console.log(error);
        return c.json({success:false,message:"Error while uploading the post"})   
    }
}

export const updateBlog = async (c : Context) => {
    
    const prisma : PrismaClient = c.get("prisma")
    const userId : string = c.get("prisma")
    
    let payload : UpdatePost;
    try {
        payload = await c.req.json()
    } catch (error) {
        return c.json({success:false,messsage:"Please provide blog inputs"},400)
    }

    const blogId = await c.req.query().blogId

    if (typeof blogId === "undefined") {
        return c.json({success:false,message:"Provide blog id"},400)
    }

    console.log("postTod",blogId);

    
    const updatedPost = await prisma.post.update({
        where:{
            id: "09b15cee-895f-41cb-b397-f0d5be0a3162"
        },

        data:{
            authorId: "3de87249-f9f7-44cb-a6db-a8f84d6b135f",
            title:  payload.title,
            content: payload.content,
            published: payload.published
        }
    })

    console.log(updatedPost);
    
    return c.json({success:true, message:"updateBlog",userId: c.get('userId')},200)
}