import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"


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

export const BlogCard = (props:BlogInputs) => {
    // 
    return (
        <div className="flex justify-center mt-2">
            <div className="w-1/3 p-3 border-b border-slate-300">
                <div className="flex justify-items-start ">
                    <div>
                        <Avatar name={props.author.name} size="small"/>
                    </div>

                    <div className="flex items-center">
                        <div className="text-sm font-medium ml-3">
                            {props.author.email}
                        </div>

                        <div>
                            
                        </div>
                        <div className="text-sm font-normal ml-3 text-slate-500">
                            Dec 2,2023
                        </div>
                    </div>
                    
                </div>
                
                <Link to={`/blog/${props.postId}`}>
                    <div className="mt-2">
                        <div className="font-bold text-xl">
                            {props.title}
                        </div>
                        <div className="font-normal font-serif mt-2">
                            {
                                (props.content.length < 300) ? props.content : props.content.slice(0,300) + "..."
                            }
                        </div>
                    </div>
                </Link>
                

                <div className="pt-3 font-normal text-slate-500">
                    {
                        Math.ceil(props.content.length / 100) + " "
                    } minutes
                     
                </div>
            </div>
        </div>
        
    )
} 