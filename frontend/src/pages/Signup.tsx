import React from "react";
import { Quote } from "../comonents/Quote";
import { Auth } from "../comonents/Auth";


export function Signup(){
    return (<div className=" grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
    )
}