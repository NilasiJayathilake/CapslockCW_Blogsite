import articles from "../article-content";
import ArticleList from "../components/ArticleList";

function ArticleListPage(){
    return(
        <>
            <h1>You will find all Articles here</h1>
            <ArticleList articles={articles}/>

        </>
    )
}
export default ArticleListPage;