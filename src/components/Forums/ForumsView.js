import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './ForumsView.css';

function ForumsView() {
    document.title = 'Forum';
    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(true);
    const [forums, setForums] = useState([]);
    var dt = new Date();

    useEffect(() => {
        db.collection("forums").get()
        .then(snapshot => {
            const historyForums = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                historyForums.push(smth);
            })
            setForums(historyForums);
            setLoading(false)
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

    const createForum = (e)=>{
        e.preventDefault();
        var title = prompt("Enter the forum title: ");
        if(title == null){
            return;
        }
        if(title.length == 0){
            alert("Title Required");
            createForum(e);
        }

        var smth = forums.filter(obj=>{
            if(obj.title == title){
                return obj.title;
            }
        }).length

        if(smth != 0){
            alert("Title is in use");
            return;
        }
        var utcDate = dt.toUTCString().split(" ");

        db.collection("forums").doc(title+" "+dt.toUTCString()).set({
            title,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            createdBy: user.displayName,
            createdUID: user.uid,
            main: title+" "+dt.toUTCString()
        });

        db.collection("forums").doc(title+" "+dt.toUTCString()).collection("forum_list").doc().set({
            createdBy: user.displayName,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            body: "The is the first card",
            full_stamp: dt.toUTCString()
        });

        const obj = {
            title,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            createdBy: user.displayName,
            createdUID: user.uid,
            main: title+" "+dt.toUTCString()
        }
        setForums([...forums, obj]);
    };

    const blogsView = (e)=>{
        e.preventDefault();
        history.push("/blogs/view");
    }

    const chartsView = (e)=>{
        e.preventDefault();
        history.push("/charts");
    }

    const usersView = (e)=>{
        e.preventDefault();
        history.push("/usersView");
    }

    const forumsView = ()=>(
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
                <div className = "main__middle" id = "forum_holder">
                    <h1>Forums</h1>
                    <button onClick = {createForum} id="forum_create_button">Create Forum</button>

                    {
                        forums && forums.map((data)=>(
                            <div className = "forums__item">
                                <span className = "forums__item__info">Title: {data.title}</span>
                                <span className = "forums__item__info">Created by: {data.createdBy}</span>
                                <Link className = "forums__item__info" to = {`/forums/view/${data.main}`} >Click Here</Link>
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
    return loading || loadingTwo ? <h1>Loading...</h1> : forumsView();
}

export default ForumsView
