import React , {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './Forums.css';

function Forums() {
    document.title = 'Forum';
    const {forumTitle} = useParams();
    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(true);
    var dt = new Date();
    const [forums, setForums] = useState([]);
    const [inputValue,setIV] = useState("");


    useEffect(() => {
        db.collection("forums").doc(forumTitle).collection("forum_list").get()
        .then(snapshot => {
            const historyForums = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                historyForums.push(smth);
            })
            
            for(var i = 0; i<historyForums.length-1; i++){
                for(var j = i+1; j<historyForums.length; j++){
                    if(Date.parse(historyForums[i].full_stamp) - Date.parse(historyForums[j].full_stamp) > 0){
                        const smth = historyForums[i];
                        historyForums[i] = historyForums[j];
                        historyForums[j] = smth;
                        setLoading(true);
                    }
                }
            }
            historyForums.reverse();
            setForums(historyForums);
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

    const submitForumCard = ()=>{
        if(inputValue == ""){alert("Blank entry");return;}
        var utcDate = dt.toUTCString().split(" ");

        db.collection("forums").doc(forumTitle).collection("forum_list").doc().set({
            createdBy: user.displayName,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            body: inputValue,
            full_stamp: dt.toUTCString()
        });

        document.getElementById("forumreply__textarea").value = "";

        const obj = {
            createdBy: user.displayName,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            body: inputValue,
            full_stamp: dt.toUTCString()
        }
        setForums([...forums, obj]);
    }

    const returnCardHTML = (data)=>(
        <div className = "forumcard">
            <div className = "credentials">
                <span className = "fromcard__createdby">{data.createdBy}</span>
                <span className = "fromcard__createdon">{data.date}</span>
            </div>
            <span className = "fromcard__body">{data.body}</span>
        </div>
    );

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


    const forumsPage = ()=>(
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
            <div className = "main__left">
                    <Link to = "#">
                        <img src = "https://i.pinimg.com/236x/c7/c8/d2/c7c8d25a1e2c356cad9b675c95ae5f7d--ad-design-design-poster.jpg" height = "700px"/>
                    </Link>
                </div>
                <div className = "main__middle">
                    <h1>{forumTitle.split(" ").splice(0,forumTitle.split(" ").length - 6).join(" ")}</h1>
                    
                    {
                        forums && forums.map((data)=>(
                            returnCardHTML(data)
                        ))
                    }
                </div>

                <div className = "main__right">
                    <div className = "forumreply">
                        <span id="forumreply__title">Forum Reply</span>

                        <textarea onChange = {(e)=> setIV(e.target.value)} id="forumreply__textarea" rows="35" cols="30"/>

                        <button onClick = {submitForumCard}>Submit</button>
                    </div>
                </div>
            </div>




            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    );
    
    
    return loading || loadingTwo ? <h1>Loading...</h1> : forumsPage();
}

export default Forums
