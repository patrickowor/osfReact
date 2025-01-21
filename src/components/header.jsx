import reactsvg from '../assets/react.svg'

// eslint-disable-next-line react/prop-types
export default function Header({checkLoggedIn, setIsLoggedIn}) {
    return (    <header>
        <div>
          <img src={reactsvg} alt="mylogo" />
        </div>
        <div>
          <ul>
            {
                checkLoggedIn ? <li onClick={setIsLoggedIn}>logout</li>  : <>
                    <li><a href="">signup</a></li>
                    <li><a href="">login</a></li>
                </>
            }

            <li><a href="">aboutus</a> </li>
          </ul>
        </div>
      </header>)
}