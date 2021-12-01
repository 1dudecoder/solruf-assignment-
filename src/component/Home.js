import React, { useEffect, useState } from 'react'
import { auth, storage } from '../Firebase'
import {useNavigate, useLocation } from "react-router-dom"
import { getAuth, updateProfile } from "firebase/auth";


function Home({myuser}) {
    const navigate = useNavigate();
    const [username,setuserName] = useState("")
    const [updatedusername, setUpdateedUserName] = useState("")
    const [imageurl,seturl] = useState("");
    const location = useLocation();


    useEffect(()=>{

        if(myuser){
            setuserName(myuser.multiFactor.user.displayName)
            seturl(myuser.multiFactor.user.photoURL)
        }else{
            navigate("/");
        }

    },[myuser])

    let file = []

    return (
        <div class="container">
            <h3> Welcome {username}</h3>
            <input type="text" value={updatedusername} onChange={(e)=>{
                setUpdateedUserName(e.target.value)
            }} />
            <br />

            <button type="text" onClick={(e)=>{
                setuserName(updatedusername)
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                displayName: updatedusername, 
                }).then(res => console.log(res))
                .catch(err=>{
                    console.log(err)
                })
                
            }}>Update Name</button>

            <br />

            <img src={imageurl} alt="blog title" width="300" height="200" />
            <label for="img">{username} Profile</label>

            <input type="file" id="img" name="img" onChange={(e)=>{
                file = e.target.files[0]

            }} accept="image/*" />
            <br />

            <button type="button" onClick={()=>{
                console.log(file);
                var uploadTask = storage.ref().child(username+file.name).put(file);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    if(progress == `100`) console.log("image uploaded complete")
                }, 
                (error) => {
                    console.log(error)
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    seturl(downloadURL);
                    const auth = getAuth();
                    updateProfile(auth.currentUser, {
                    photoURL: downloadURL,
                    }).then(res=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    });
                }
                );

            }}>upload pic</button>
            <br />


            <button type="button" onClick={()=>{
                auth.signOut()
            }}>LOgOut</button>




        </div>
    )
}

export default Home