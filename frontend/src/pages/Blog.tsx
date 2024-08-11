import React from "react";
import { BlogCard } from "../comonents/BlogCard";
import { AppBar } from "../comonents/AppBar";
export function Blog(){
    return <>
        <AppBar/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
    </>
}