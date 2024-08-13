import { BlogCard } from "../comonents/BlogCard";
import { AppBar } from "../comonents/AppBar";
import { useFetchBlogs } from "../hooks/useFetchBlogs";



export function Blog(){

    const{blogs,loading}  = useFetchBlogs()

    return <>
        {
            (loading === true) ? 
                <h2>Loading....</h2> : 
                <div>
                    <AppBar/>
                    {
                        blogs.map(({postId,title,content,author})=> {
                            return <BlogCard key={postId} postId={postId} author={author} content={content} title={title}/> 
                        })
                    }
                </div>
        }
        
    </>
}