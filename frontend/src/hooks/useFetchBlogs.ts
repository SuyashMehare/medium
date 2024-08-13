import { useState, useEffect } from 'react';
import axios from "axios";

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


function useFetchBlogs() {
    
    const [blogs,setBlogs] = useState<BlogInputs[]>([])
    const [loading, setLoading] = useState<Boolean>(true)


    async function fetch() {
        try {
            const res = await axios.get('https://backend.suyash-mehare01.workers.dev/api/v1/blog/bulk',{
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("jwt")
                }
            })
    
            setBlogs(res.data.data.posts)
            setLoading(false)

        } catch (error) {
            console.log("error",error);
        }
    }

    useEffect(()=>{       
        fetch()
    },[])
    
    return {
        blogs,
        loading
    }
    
}


export {
    useFetchBlogs
}