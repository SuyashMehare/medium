import axios from "axios"
import { useEffect, useState } from "react"

type Author = {
    name : string,
    email : string,
}

type BlogInputs = {
    postId : string,
    title : string,
    content : string,
    author: Author
}

export const useFetchBlog = ({blogId} : {blogId:string}) => {
    
    const [blog,setBlog] = useState<BlogInputs>();
    const [loading, setLoading] = useState<Boolean>(true)

    async function fetch() {
        try {

            // console.log(`https://backend.suyash-mehare01.workers.dev/api/v1/blog/:blogId = '${blogId}`);
            
            const res = await axios.get(`https://backend.suyash-mehare01.workers.dev/api/v1/blog/:?blogId=${blogId}`,{
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("jwt")
                }
            })            
            setBlog(res.data.data.blogPost)
            setLoading(false)

        } catch (error) {
            console.log("error",error);
        }
    }

    useEffect(()=>{       
        fetch()
    },[])

    return {
        blog,
        loading
    }
}