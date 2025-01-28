import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { useState  } from 'react'
import AuthContext from './context'
import {BrowserRouter, StaticRouter, HashRouter, Route, Routes} from "react-router";



function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [userAuth, setUserAuth] = useState(null)
  const changeLoginState = () => setIsLoggedIn( !isLoggedin)
  
  return <>
      <AuthContext.Provider value={{isLoggedin,changeLoginState, userAuth, setUserAuth }}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
        
      </AuthContext.Provider>
      
  </>
  

}

export default App
