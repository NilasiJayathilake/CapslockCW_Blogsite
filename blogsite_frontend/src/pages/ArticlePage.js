import {useParams} from "react-router-dom";
import articles from '../article-content';
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/commentsList";
import axios from "axios";
import {useState, useEffect} from "react";
import PostCommentForm from "../components/postComment";
import useUser from "../hooks/useUser"


function ArticlePage(){
    // assigning the url article name to article id
    const {articleID} = useParams();
    // using state to manage the initial state and after loading data from db of the article
    const[articleInfo, setArticleInfo] = useState( {upvote:0, comments:[], eligibility: false});
    // updating with article db data

    const eligibility = articleInfo.eligibility;

    const{user,loading} = useUser();

    console.log("hellooo");
    console.log('articleInfo:', articleInfo);
    console.log('user:', user);
    console.log('user.id:', user && user.id); // Make sure this is defined
    console.log('articleInfo.upvoteIDs:', articleInfo.upvoteIDs); // Ensure this is populated

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleID}`, {headers});
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if (!loading){
            loadArticleInfo();
        }
        console.log('articleInfo:', articleInfo);
    }, [loading, user]);

        const article = articles.find(article => article.name === articleID);
        async function Upvote(){
                    const token = user && await user.getIdToken();
                    //checks whether user exists and if logged in gets the user's ID and set it to token
                    const headers = token ? { authtoken: token } : {};
                    // if the token exists authtoken key is set with the value of the token from fs. if not an empty array is set for headers.
                    const response = await axios.put(`/api/articles/${articleID}/upvote`,null, {headers});
                    const updatedArticle = response.data;
                    setArticleInfo(updatedArticle);
                }
        if (!article) {
            return <NotFoundPage/>
        }
        const buttonClass = eligibility ? 'upvote-btn' : 'upvoted-btn';
    return (
            <>
                <h1>{article.title}</h1>
                <div className="upvotes-section">
                    {user
                        ? <button onClick={Upvote} className={buttonClass}>{eligibility ? 'UpVote' : 'UpVotedAlready'}</button>
                        : <button>Log in to upvote</button>}
                    <p>Up Votes: {articleInfo.upvote}</p>

                </div>
                {
                    article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                {user
                    ?<PostCommentForm
                        articleID={articleID}
                        onArticleUpdate={updateArticle => setArticleInfo(updateArticle)}/>
                    :<button>Log in to add a Comment</button>}
                    <CommentsList comments={articleInfo.comments}/>
            </>
    )


}

export default ArticlePage;