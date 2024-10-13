import {Link} from "react-router-dom";
import useUser from "./hooks/useUser";
import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";

function NavBar(){
    const {user} = useUser();
    const navigate = useNavigate();
    return(
        <nav >
            <div className="logoName">
                <a href="https://web.facebook.com/profile.php?id=100094401101155">
                        Capslock Content Writing
                </a>
            </div>
            <ul>
                <li>
                    <Link to="/">Home Page</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">All Articles</Link>
                </li>
                <div className='nav-right'>
                    {user
                        ?<button onClick={()=>{
                            signOut(getAuth());
                        }}>LogOut</button>
                        :<button onClick={()=>{
                            navigate('/login');
                        }}>Login</button>
                    }

                </div>
            </ul>
        </nav>
    );
}
export default NavBar;