import { useContext } from 'react'
import AuthContext from '../context'

export default function Tester(){

    const { 
        userAuth
      } = useContext(AuthContext)
    return <>thisis a test {userAuth}</>
}