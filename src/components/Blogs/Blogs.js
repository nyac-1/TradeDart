import React , {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import "./Blogs.css";
import ReactHtmlParser from 'react-html-parser';
import {useStateValue} from "../../StateProvider.js";

function Blogs() {

    document.title = 'Blog';

    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(undefined);
    const {blogTitle} = useParams(); 

    useEffect(() => {
        db.collection('blogs').doc(blogTitle).get()
        .then(
            docu => {
                var data = docu.data();
                setBlog(data);
                setTimeout(() => {setLoading(false);}, 1000);                
            } 
        )
        .catch(e=>{
            alert(e);
        });
    }, [])

    
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

    const clap = (event) =>{
        event.preventDefault();
        db.collection("blogs").doc(blogTitle).update({
            likes: blog.likes+1,
        });
        setTimeout(() => {document.location.reload(true)}, 1000);

    }

    const boo = (event) =>{
        event.preventDefault();
        db.collection("blogs").doc(blog.title).update({
            dislikes: blog.dislikes+1,
        });
        setTimeout(() => {document.location.reload(true)}, 1000);
    }

    const blogsView = (e)=>{
        e.preventDefault();
        history.push("/blogs/view");
    }

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

    const blogPageFull = ()=>(

        <div className = "profile">
            <div className = "navbar">
                <nav className = "navbar__nav">
                    <Link className = "navbar__nav__link" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {blogsView}>
                            <p>Blogs</p>
                        </Link>
                    </div>

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
                <div className = "main__left"></div>
                <div className = "main__middle">
                    <div className = "main__middle__title">
                        <h1>{blog.title}</h1>
                    </div>

                    <div className = "main__middle__blog">
                        {
                            blog && <div> { ReactHtmlParser (blog.html_content) } </div>
                        }
                    </div>
                </div>
                <div className = "main__right">
                    <div className = "likes__dislikes">
                        <div className = "item__box">
                            <p>Date posted: {blog.date}</p>
                        </div>
                        <div className = "item__box">
                            <p>Claps: {blog.likes}</p>
                            <button className = "likes" onClick={clap}>Like</button>
                        </div>

                        <div className = "item__box">
                            <p>Boos: {blog.dislikes}</p>
                            <button className = "likes" onClick={boo}>Dislike</button>
                        </div>
                    </div>
                </div>

            </div>


            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    );
    return loading ? <h1>Loading...</h1> : blogPageFull();
}

export default Blogs
