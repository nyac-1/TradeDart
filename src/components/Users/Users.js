import React , {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './Users.css';

function Users() {

    document.title = 'Search';

    const {user_uid} = useParams();
    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(true);
    const [userGuy,setUser] = useState("");
    const [imageProfile, setImg] = useState();

    useEffect(() => {
        db.collection('users').doc(user.uid).onSnapshot(doc => {
            setImg(doc.data());
        })
    }, [])

    useEffect(() => {
        db.collection("users").get()
        .then(snapshot => {
            const historyUsers = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                if(user_uid === smth.email){
                    historyUsers.push(smth);
                }
            })
            setUser(historyUsers);
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

    
    const usersPage = ()=>(
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
                <div className = "main__middle" id="user_page_middle">
                    
                        {
                            userGuy && userGuy.map((data)=>(
                                <div id = "userprofile">
                                <span id="userprofile__name">{data.name}</span>
                                <img id="userprofile__img" src = {data.profilePhoto} height="275px" />
                                <span id = "email__id__margin" className = "userprofile__smth">Email: {data.email}</span>
                                <span className = "userprofile__smth">Phone: {data.phone}</span>
                                <span className = "userprofile__smth">D.O.B: {data.dob}</span>
                                {/* <span className = "userprofile__smth">Date joined: {user.metadata.creationTime.split(" ").slice(1,4).join(" ")}</span> */}
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

    return loading || loadingTwo ? <h1>Loading...</h1> : usersPage();
}

export default Users
