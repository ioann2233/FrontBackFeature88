import {useEffect, useState} from "react";
import SignUpForm from "./Components/SignUpForm/SignUpForm.jsx";
import {AuthContext} from "./context/index.js";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./Components/UI/Navbar/Navbar.jsx";
import AppRouter from "./Components/AppRouter.jsx";
import Camera from "./Components/Camera/Camera.jsx";
import bg from './Images/bg.jpg'
import CallButton from "./Components/CallButton/CallButton.jsx";
function App() {
    const [isAuthorized, setIsAuthorized] = useState(true);
    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuthorized(true);
        }
    },[])
  return (
      <div className={"w-full h-fit flex flex-col items-center justify-center bg-cover"} style={{backgroundImage: `url(${bg})`}}>
              <AuthContext.Provider value={{
                  isAuthorized,
                  setIsAuthorized,
              }}>
                  <BrowserRouter>
                      <Navbar/>
                          <AppRouter/>
                      <CallButton/>
                      <Camera/>
                  </BrowserRouter>
              </AuthContext.Provider>
      </div>
  )
}

export default App
