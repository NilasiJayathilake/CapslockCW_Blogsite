import axios from "axios";
import {useState} from "react";
import useUser from "../hooks/useUser";

function PostCommentForm({articleID, onArticleUpdate}){
    const[userName,setUserName] = useState("");
    const[comment, setComment] = useState("");
    const {user} = useUser();

    async function PostComment(){
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        try{
            const response = await axios.post(`/api/articles/${articleID}/comment`, {
                    postedBy: userName,
                    text: comment,
                    email: user.email
                },
                {headers}
            )
            const updatedArticle = response.data;
            onArticleUpdate(updatedArticle);
            setUserName("");
            setComment("");
        }catch (error){
            console.log(error);
        }

    }

    return(
        <>
            <h4>Post a Comment</h4>
            {user && <p>You are Logged In As {user.email}</p> }
            <br></br>
            <label>
                Posted By:
                <input
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                    type="text"
                />

            </label>
            <label>
                Comment:
                <textarea rows="4" cols="8"
                value={comment}
                onChange={event => setComment(event.target.value)}
                ></textarea>
            </label>
            <button onClick={PostComment}>Submit</button>
        </>
    );
}
export default PostCommentForm;