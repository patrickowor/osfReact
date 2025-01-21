import './App.css'
import Header from "./components/header" 
import  {Login, Dashboard} from "./components/body"
import Footer from './components/footer'
import { useState } from 'react'

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const changeLoginState = () => setIsLoggedIn(!isLoggedin)
  return (<>
    <Header checkLoggedIn={isLoggedin} setIsLoggedIn={changeLoginState} />
    <>{isLoggedin ? <Dashboard />: <Login setIsLoggedIn={changeLoginState}/>}</>
    <Footer />
  </>)
}

export default App
