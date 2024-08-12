import React from "react";
import { BlogCard } from "../comonents/BlogCard";
import { AppBar } from "../comonents/AppBar";
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
        // console.log();
        
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



export function Blog(){

    const[blogs,loading] = useFetchBlogs()
    
    console.log(loading);
    
    console.log(blogs);
    
    return <>
        <AppBar/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
    </>
}