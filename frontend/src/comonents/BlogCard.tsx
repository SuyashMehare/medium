import { Avatar } from "./Avatar"

export const BlogCard = () => {
    
    return (

        <div className="flex justify-center mt-2">
            <div className="w-1/3 p-3 border-b border-slate-300">
                <div className="flex justify-items-start ">
                    <div>
                        <Avatar name="Suyash" size="small"/>
                    </div>

                    <div className="flex items-center">
                        <div className="text-sm font-medium ml-3">
                            Peter V.
                        </div>

                        <div>
                            
                        </div>
                        <div className="text-sm font-normal ml-3 text-slate-500">
                            Dec 2,2023
                        </div>
                    </div>
                    
                </div>
                
                <div className="mt-2">
                    <div className="font-bold text-xl">
                        How an Ugly Single-Page 
                    </div>
                    <div className="font-normal font-serif mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                        elit. Facere harum, esse illo veniam explicabo dolorem,
                        eos neque dolores quas ipsum nesciunt corporis? 
                        Nisi, iusto at molestias sint possimus ratione. Rem.
                    </div>
                </div>

                <div className="pt-3 font-normal text-slate-500">
                    3 min read
                </div>
            </div>
        </div>
        
    )
} 