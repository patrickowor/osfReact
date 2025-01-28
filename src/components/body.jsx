import { useEffect, useState } from "react";
import buttonStyles from '../styles/button.module.css'
import { useContext } from 'react'
import AuthContext from '../context'
import { useNavigate } from "react-router";

export function Login (){

    const { 
        setUserAuth,
        changeLoginState : setIsLoggedIn  
      } = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setIsLoading] = useState(false)

    const handleSubmit = async (e) =>{
        if(loading) return ;
        setIsLoading(!loading)
        e.preventDefault();

        //form submittion goes here 
         
           try {
                const res = await fetch (
                    "http://192.168.1.73:5007/login",
                    {
                        method: "post", 
                        body : JSON.stringify({email, password}),
                        headers: {
                            'Content-Type': 'application/json' // Set the content type to JSON
                        },
                    
                    })

                if(res.ok){
                    const response = await res.json()
                    setUserAuth(response.token)
                    setIsLoggedIn();
                    navigate("/home")
                } else {
                    console.log('Error', await res.json(), res.status)
                }                
            } catch(err)  {
                console.log(err)
            }

        
    }

    return (    <main>
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Username" value={email} onChange={(e)=> setEmail(e.target.value)  } required  />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className={`${buttonStyles.buttonGreen} ${buttonStyles.buttonRed}`} onClick={handleSubmit} >{loading? 'Loading':  'Login'}</button>
            </form>
            <a href="#" className="register-link"  >Don&apos;t have an account? Register</a>
        </div>
      </main>)
} 


export function Dashboard (){
    const { 
        userAuth,
        changeLoginState,  
      } = useContext(AuthContext)
    const  navigate = useNavigate()
    const [username, setUserName] = useState('Guest')

    useEffect(()=>{
        (async ()=>{
            try {
                const res = await fetch (
                    "http://192.168.1.73:5007/user",
                    {
                        method: "get", 
                        headers: {
                            'Content-Type': 'application/json' ,
                            Authorization : `Bearer ${userAuth}`
                        },
                    
                    })

                if(res.ok){
                    const response = await res.json()
                    setUserName(response.name)
                } else {
                    changeLoginState()
                    navigate("/")
                    console.log('Error', await res.json(), res.status)
                }                
            } catch(err)  {
                changeLoginState()
                navigate("/")
                console.log(err)
            }

        })()
    } , [userAuth, changeLoginState, navigate])
    return <main>
        <div className="login-container">
            <h6>welcome {username}</h6>
        </div>
    </main>
}


