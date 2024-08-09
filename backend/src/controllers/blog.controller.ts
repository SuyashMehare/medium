import { PrismaClient } from "@prisma/client/edge";
import { Context } from "hono";

export const getAllBlogs = async (c : Context) => {

    const prisma : PrismaClient = c.get("prisma")
    const skip : number = Number(await c.req.query().skip);


    try {
        const posts = await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                author:{
                    select:{
                        name:true,
                        email:true
                    }
                },
            },
            skip: skip || 0 ,
            take:10
        })
    
    
        return c.json({success:true, data:{posts}, userId: c.get('userId')},200)
    } catch (error) {
        console.log(error);
        return c.json({success:true, message:"Cant fetch" },500)
    }
}

export const getBlogById = async (c : Context) => {

    const prisma : PrismaClient = c.get("prisma")
    const blogId : string | undefined = await c.req.query().blogId


    if(!blogId){
        return c.json({success:false, message: "Provide blog id"},400)
    }


    try {

        const blogPost = await prisma.post.findUnique({
            where:{
                id:blogId
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        })
        

        if(blogPost === null) {
            return c.json({success:false,message:"Invalid blog id"},400)
        }

        return c.json({success:true,data:{blogPost}},200)
    } catch (error) {
        console.log("Error while fetching post",error);
        return c.json({success: false,message:"Error while fetching post"},500)
    }   
}


interface UploadPost {
    title: string,
    content: string,
    published ? : boolean
}


export const uploadBlog = async (c : Context) => {
    
    const prisma : PrismaClient = c.get("prisma")
    const userId : string = c.get("userId") 


    const payload : UploadPost= await c.req.json()

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


interface UpdatePost {
    title?: string,
    content?: string,
    published ? : boolean
}

export const updateBlog = async (c : Context) => {
    
    const prisma : PrismaClient = c.get("prisma")
    const userId : string = c.get("userId")
    
    let payload : UpdatePost;
    try {
        payload = await c.req.json()
    } catch (error) {
        return c.json({success:false,messsage:"Please provide blog inputs"},400)
    }

    const blogId : string | undefined = await c.req.query().blogId

    if (typeof blogId === "undefined") {
        return c.json({success:false,message:"Provide blog id"},400)
    }

    
    const updatedPost = await prisma.post.update({
        where:{
            id: blogId
        },

        data:{
            authorId: userId,
            title:  payload.title,
            content: payload.content,
            published: payload.published
        },
        select:{
            id:true,
        }
    })

    
    return c.json({success:true, data:{postId : updatedPost}},200)
}