import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// getAuth means the status whether the user is logged in or not
function useUser(){
    const[user,setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), authUser =>{
            setUser(authUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    return {user,loading};

}
export default useUser;