import './App.css'
import Header from "./components/header" 
import  {Login, Dashboard} from "./components/body"
import Footer from './components/footer'
import { useState } from 'react'

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const changeLoginState = () => setIsLoggedIn(!isLoggedin)
  const [userAuth, setUserAuth] = useState(null)
  return (<>
    <Header checkLoggedIn={isLoggedin} setIsLoggedIn={changeLoginState} />
    <>{isLoggedin ? <Dashboard userAuth={userAuth} changeLoginState={changeLoginState}  />: <Login setIsLoggedIn={changeLoginState}  setUserAuth={setUserAuth}/>}</>
    <Footer />
  </>)
}

export default App
