import {Link} from "react-router-dom";

function ArticleList({articles}){
    return(
        <>
            {
                articles.map(article => (
                    <Link key={article.name} to={`/articles/${article.name}`} className='article-list-item'>
                        <div className='articleBox'>
                            <h3>{article.title}</h3>
                            <p>
                                {article.content[0].substring(0, 200)}...
                            </p>
                        </div>
                    </Link>
                ))
            }
        </>

    );
}

export default ArticleList;