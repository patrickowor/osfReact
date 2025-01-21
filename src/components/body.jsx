import { useState } from "react";
/* eslint-disable react/prop-types */
export function Login ({setIsLoggedIn}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setIsLoading] = useState(false)

    const handleSubmit = async (e) =>{
        if(loading) return ;
        setIsLoading(!loading)
        e.preventDefault();
        // form submittion goes here
        const res = await fetch ("https://label-box.onrender.com/login", {method: "POST", body : JSON.stringify({email, password})})

        if(res.ok){
            console.log(await res.json())
            setIsLoggedIn();
        } else {
            console.log('Error', await res.json(), res.status)
        }
        
    }

    return (    <main>
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Username" value={email} onChange={(e)=> setEmail(e.target.value)  } required  />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button onClick={handleSubmit}>{loading? 'Loading':  'Login'}</button>
            </form>
            <a href="#" className="register-link">Don&apos;t have an account? Register</a>
        </div>
      </main>)
} 


export function Dashboard (){
    return <>welcome to the dashboard oh great lord</>
}


