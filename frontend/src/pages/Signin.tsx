import React from "react";
import { Quote } from "../comonents/Quote";
import { Auth } from "../comonents/Auth";


export function Signin(){
    return (<div>
       
        <div className=" grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signin"/>
        </div>

        
        <div className="hidden lg:block"> 
            <Quote/>
        </div>
    </div>
        </div>
    )
}