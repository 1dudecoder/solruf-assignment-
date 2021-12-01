import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase';
import {useNavigate} from "react-router-dom"


function Signup({myuser}) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log("mysignup -> ", email, password, cpassword, name);
        try{
            const result = await auth.createUserWithEmailAndPassword(email,password)
            console.log(result)
            await result.user.updateProfile({
                displayName: name
            })
            alert("Succefully Signup")
            navigate("/home")
        }catch(err){
            alert(err.message)
        }
    }


    return (

        <div>
            <h1>WELCONE TO SIGNUP</h1>
            <label>ENTER YOUR NAME</label>
            <input type="text" value={name} onChange={(e)=>{
                setName(e.target.value)
            }} />
            <br />
            <br />
            <label>ENTER YOUR EMAIL</label>
            <input type="text" value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <br />
            <br />
            <label>ENTER YOUR PASSWORD</label>
            <input type="password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <br />            
            <br />
            <label>CONFORM PASSWORD</label>
            <input type="password" value={cpassword} onChange={(e)=>{
                setCpassword(e.target.value)
            }} />
            <br />
            <br />

            <button type="button" onClick={handleSubmit}>SignUp</button>
            <br />
            <br />
            <br />
            If already have an account
            <button type="button" onClick={()=>{
                navigate("/")
            }}>Login</button>

        </div>
    )

}

export default Signup