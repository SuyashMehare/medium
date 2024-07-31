import { SigninInput, SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { ChangeEvent,  useState } from "react";

import { Link, useNavigate } from "react-router-dom";


type authType = "signup" | "signin";
type genricType = SignupInput | SigninInput;

function getSignUpInput(): SignupInput{
    return {
        name:"",
        username:"",
        password:""
    }
}

function getSigninInput(): SigninInput{
    return {
        username:"",
        password:""
    }
}



export function Auth({type} : {type:authType}){

    const initState = type === "signup" ? getSignUpInput() : getSigninInput(); 
    
    const [formInputs,setFromInputs] = useState<genricType>(initState)
    const navigate = useNavigate()

    async function sendAuthnputs(){
        
        const to = type === "signup" ? "signup" : "signin"
        const urlString = `http://localhost:3000/${to}`
            
        try {
            const res = await axios.post(urlString,formInputs)
            const jwt = res.data
            localStorage.setItem("jwt",jwt);
            navigate('/blog')

        } catch (error) {
            console.log("Error while posting data....",error);
            alert('Can not signin/signup')
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        
        <div className="flex justify-center">
            <div>    
                <div className="px-10 mt-4 mb-5" >
                    <div className="text-3xl font-bold">
                        Create an account
                    </div>
                    <div className="text-slate-700">
                        {type == "signin"? "Don't have an account?": "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>

                <div>
                    {
                        type === "signup" ? <CreateInput label="Name" placeHolder="Enter your name"
                        onchange={(e) => {
                            setFromInputs({
                                ...formInputs,
                                name : e.target.value,
                                username: e.target.value,
                                password:e.target.value
                            })
                    }}/>: null
                    }

                    <CreateInput label="Username" placeHolder="Enter your username"
                        onchange={(e) => {
                            setFromInputs({
                                ...formInputs,
                                name : e.target.value,
                                username: e.target.value,
                                password:e.target.value
                            })
                    }}/>
                    <CreateInput label="Password" placeHolder="Enter password" type="password"
                        onchange={(e) => {
                            setFromInputs({
                                ...formInputs,
                                name : e.target.value,
                                username: e.target.value,
                                password:e.target.value
                            })
                    }}/>
                </div>

                <div>
                <button type="button" onClick={sendAuthnputs} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 w-full  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
                </div>
            </div>
            
        </div>
    </div>
}

interface Options{
    label:string;
    placeHolder:string;
    type? : string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
} 

function CreateInput(options: Options) {
    

    return(  <div className="mt-4">
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{options.label}</label>

        <input onChange={options.onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={options.placeHolder} type={options.type ||  "text"} required />
        
    </div>)
}