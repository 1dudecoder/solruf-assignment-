import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { auth } from './Firebase';


function App() {

  const [user, setuser] = useState(null)
  
  useEffect((e)=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setuser(user);
        console.log("user has been login")
      }else{
        setuser(null);
      }
    })

  },[])


  return (
    <div className="App">
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login myuser={user} />} />
            <Route path="/signup" element={<Signup myuser={user} />} />
            <Route path="/home" element={<Home myuser={user} />} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
