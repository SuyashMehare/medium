import { Avatar } from "./Avatar";

export function AppBar() {
    
    return(
        <div className="flex justify-between px-20 py-5 border-b border-slate-200 ">
            
            <div className="flex items-center mr-20">
                    <div>Medium</div>
                </div>

            <div className="flex justify-between">

                <div className="flex items-center mr-20">
                    <div>Publish</div>
                </div>
                <div>   
                    <Avatar name="Suyash" size="big"/>
                </div>
            </div>
        </div>
    )
}