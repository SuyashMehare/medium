import { useState, useEffect } from 'react';
import axios from "axios";



export function useFetchBlogs() {
    
    const [blogs,setBlogs] = useState()
    const [loading, setLoading] = useState(true)


    async function fetch() {
        const res = await axios.get('https://backend.suyash-mehare01.workers.dev/api/v1/blog/bulk',{
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })

        setBlogs(res.data);
        setLoading(false)
    }

    useEffect(()=>{
        fetch()
    },[])
    
    return [
        blogs,
        loading
    ]
    
}