import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
function CreateAccount(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();
    async function Create(){
        try{
            if (password===confirm){
                await createUserWithEmailAndPassword(getAuth(), email, password);
                navigate('/');
            }else{
                setError("Passwords Do not Match. Please check again.");
                return;
            }
        }catch (error){
            setError(error.message)
        }
    }
    return(
        <>
            <h1>Create an Account</h1>
            {error && <p className="error">{error}</p>}
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
            <label>
                Confirm Password:
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                />
            </label>
            <button onClick={Create}>Create Account</button>
            <br></br>
            <Link to="/login">Already Have an Account? Login Here!</Link>

        </>
    )
}

export default CreateAccount;