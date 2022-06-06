import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './BlogsView.css';

function BlogsView() {
    document.title = 'Blog';

    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const forumsView = (e)=>{
        e.preventDefault();
        history.push("/forums/view");
    }

    const chartsView = (e)=>{
        e.preventDefault();
        history.push("/charts");
    }

    const usersView = (e)=>{
        e.preventDefault();
        history.push("/usersView");
    }

    useEffect(() => {
        db.collection("blogs").get()
        .then(snapshot => {
            const historyBlogs = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                historyBlogs.push(smth);
            })

            for(var i = 0; i<historyBlogs.length; i++){
                for(var j = 0; j<historyBlogs.length - i -1; j++){
                    if(historyBlogs[j].likes <= historyBlogs[j+1].likes){
                        var temp = historyBlogs[j];
                        historyBlogs[j] = historyBlogs[j+1];
                        historyBlogs[j+1] = temp;
                    }
                }
            }


            setBlogs(historyBlogs);
            setLoading(false);
        })
        .catch(e=>{
            alert(e);
        });
    }, [])

    useEffect(() => {
        if(isAuthenticated){
            setLoadingTwo(false);
        }
    }, [isAuthenticated])

    const out = ()=>{
        auth.signOut()
        .then(()=>{
            alert("Signed out!");
            history.push("/login");
        })
        .catch((e)=>{
            alert(e.message);
        })
    }

    const blogViewPage = ()=>(
        <div className = "profile">
            <div className = "navbar">
                <nav className = "navbar__nav">
                    <Link className = "navbar__nav__link" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {forumsView}>
                            <p>Forums</p>
                        </Link>
                    </div>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {usersView}>
                            <p>Search</p>
                        </Link>
                    </div>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {chartsView}>
                            <p>Charts</p>
                        </Link>
                    </div>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {out}>
                            <p>Sign Out</p>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className = "main">
                <div className = "main__left">
                    <Link to = "#">
                        <img src = "https://i.pinimg.com/236x/c7/c8/d2/c7c8d25a1e2c356cad9b675c95ae5f7d--ad-design-design-poster.jpg" height = "700px"/>
                    </Link>
                </div>
                <div className = "main__middle">
                    <h1>Blogs</h1>
                    {
                        blogs && blogs.map(data => (
                            <div className = "blogs__item">
                        <div className = "blogs__inner__item">
                            <span className = "blogs__head__title">Title:</span>
                            <span className = "actual__title">{data.title}</span>
                        </div>
                        <div className = "blogs__inner__item">
                            <span className = "blogs__head__title">Date added:</span>
                            <span className = "actual__date">{data.date}</span>
                        </div>

                        <div className = "blogs__inner__item">
                            <span className = "actual__likes right">{data.likes}</span>
                            <span className = "blogs__head__title right">Likes:</span>
                        </div>

                        <div className = "blogs__inner__item">
                            <span className = "actual__dislikes right">{data.dislikes}</span>
                            <span className = "blogs__head__title right">Dislikes:</span>
                        </div>
                        <br />
                        <div className = "blogs__inner__item row_center">
                            <Link className="link" to = {`/blogs/view/${data.title}`}>Open</Link>
                        </div>
                    </div>
                        ))
                    }
                </div>

                <div className = "main__right">
                    <Link to = "#">
                        <img src = "https://i.pinimg.com/236x/c7/c8/d2/c7c8d25a1e2c356cad9b675c95ae5f7d--ad-design-design-poster.jpg" height = "700px"/>
                    </Link>
                </div>
            </div>


            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    );

    return loading || loadingTwo ? <h1>Loading...</h1> : blogViewPage();
}
export default BlogsView;
