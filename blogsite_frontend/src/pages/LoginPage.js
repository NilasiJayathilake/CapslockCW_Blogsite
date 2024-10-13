import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    async function Login(){
        try{
        await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/');
        }catch (error){
            setError(error.message);
        }
    }

    return(
        <>
            <h1>Login to Your Account</h1>
            {error && <p className="error">{error}</p> }
            <label>
                Email:
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button onClick={Login}>Login</button>
            <br></br>
            <Link to="/create" >Don't have an account? Create One Here</Link>


        </>
    )
}

export default LoginPage;