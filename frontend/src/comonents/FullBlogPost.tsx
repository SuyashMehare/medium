import { useParams } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useFetchBlog } from "../hooks/useFetchBlog";
import { AppBar } from "./AppBar";

type ParamTypes = {
    blogId : string
}

export const FullBlogPost = () => {

    const {blogId} = useParams<ParamTypes>() as ParamTypes
    
    const {blog,loading} = useFetchBlog({blogId})
    
    console.log(loading);
    // console.log(blog);
    
    return (
        <div>
            <AppBar/>
            <div className="grid grid-cols-12 px-16 mt-16">
            <div className=" col-span-8 pr-3 pl-5">

                <div className="text-5xl font-extrabold">
                    {blog?.title}
                </div>

                <div className="text-slate-500  font-normal  pt-5">
                    Posted in Augest 24, 2024
                </div>
                <div className="text-slate-950  font-normal pt-5">
                    {blog?.content}
                </div>
            </div>
            <div className="col-span-4 pl-10">
                <div>Author</div>
                <div className="flex">
                    <div className="flex items-center">
                        <Avatar name={blog?.author.name || "Anonymous"} size="small"/>
                    </div>
                    <div className="mt-4 pl-5">
                        <div className="text-2xl font-bold">
                            {blog?.author.name || "Anonymous"}
                        </div>


                        <div className="pt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatum nobis 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}