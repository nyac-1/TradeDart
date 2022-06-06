import React , {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './UserView.css';

function UserView() {

    document.title = 'Search';
    
    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchValues, setSearch] = useState([]);

    useEffect(() => {
        db.collection("users").get()
        .then(snapshot => {
            const historyUsers = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                historyUsers.push(smth);
            })
            setUsers(historyUsers);
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
    
    var counter = 0;

    const addRow = (data)=>{

        var cls = (counter%2) ? "none" : "active-row";
        var link = "/users/"+data.email;
        counter++;

        return(
            <tr className = {cls}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <Link className = "navbar__nav__item__link" onClick = {()=>{history.push(link);}}>
                    <td>Show</td>
                </Link>
            </tr>
        );
    };

    const search = (value)=>{
        var smth = []
        value = value.trim();
        users && users.map((data)=>{
            if((data.name.toLowerCase()).includes(value.toLowerCase())){
                smth.push(data);
            }
        });
        setSearch(smth);
    };

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

    const userView = ()=>(
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
                    <input autoComplete = "off" onChange = {(e)=>{search(e.target.value);}} type = "text" placeholder = "Search Users" id = "search_cred"/>
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchValues && searchValues.map((data)=>(addRow(data)))
                                }
                            </tbody>
                        </table>

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
    
    
    return loading || loadingTwo ? <h1>Loading...</h1> : userView();
}

export default UserView
