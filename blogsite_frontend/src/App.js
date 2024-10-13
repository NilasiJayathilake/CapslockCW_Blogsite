import './App.css';
import ArticlePage from "./pages/ArticlePage";
import ArticleListPage from "./pages/ArticleListPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NavBar from "./NavBar";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (

      <BrowserRouter>
    <div className="App">
        <NavBar/>
      <div id="page-body">

              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/about" element={<AboutPage/>}/>
                  <Route path="/articles" element={<ArticleListPage/>}/>
                  <Route path="/articles/:articleID" element={<ArticlePage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/create" element={<CreateAccount/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>

              </Routes>


      </div>
    </div>
      </BrowserRouter>
  );
}

export default App;

