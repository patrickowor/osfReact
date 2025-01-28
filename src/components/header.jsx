import reactsvg from '../assets/react.svg'
import { useContext } from 'react'
import AuthContext from '../context'
import { Link, useNavigate } from 'react-router'

export default function Header() {
    const { 
      isLoggedin : checkLoggedIn,
      changeLoginState : setIsLoggedIn  
    } = useContext(AuthContext)
    const navigate= useNavigate()

    return (    <header>
        <div>
          <img src={reactsvg} alt="mylogo" />
        </div>
        <div>
          <ul>
            {
                checkLoggedIn ? <li onClick={() => { navigate('/');setIsLoggedIn();}}>logout</li>  : <>
                    <li><Link to="/">signup</Link></li>
                    <li><Link to="/">login</Link></li>
                </>
            }

            <li><Link to="/">aboutus</Link> </li>
          </ul>
        </div>
      </header>)
}