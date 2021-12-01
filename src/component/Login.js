import React,{useEffect, useState} from 'react'
import { auth } from '../Firebase';
import {useNavigate} from "react-router-dom"

function Login({myuser}) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log("mysignup -> ", email, password);
        
        try{
            const result = await auth.signInWithEmailAndPassword(email,password)
            console.log(result)
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(()=>{
        if(myuser){
            console.log(myuser);
            console.log("hey i am here")
            navigate("home");
        }
    },[myuser])


    return (
        <div>
            <h1>WELCOME TO LOGIN</h1>
            <label>ENTER YOUR EMAIL</label>
            <input type="text" value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <br />
            <br />

            <label>ENTER YOUR PASSWORD</label>
            <input type="password" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <br />            
            <br />
            <button type="button" onClick={handleSubmit}>Login</button>

            <br />
            <br />
            If User don't have an account 

        <button type="button" onClick={()=>{
                navigate("/signup")
            }}>SignUp</button>

        </div>
    )
}

export default Login