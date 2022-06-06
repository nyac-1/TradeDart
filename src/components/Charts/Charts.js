import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import './Charts.css';

function Charts() {

    document.title = 'Chart';

    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(isAuthenticated){
            setLoading(false);
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


      
    
    const chartsPage = ()=>(
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
                    <div className = "charts">
                        <h3 className="charts__class">Nifty</h3>
                        <iframe className="charts__class" src="https://tvc4.forexpros.com/init.php?pair_ID=17940&domain_ID=56&lang_ID=…ession=session&interval=6&client=1&user=0&site=https://in.investing.com" width="1000" height="600"></iframe>
                        {/* <iframe className="charts__class" src="https://tvc4.forexpros.com/init.php?pair_ID=17940&domain_ID=56&lang_ID=56&timezone_ID=23&refresh=6&session=session&interval=6&client=1&user=0&site=https://in.investing.com" width="800" height="700"></iframe> */}
                        <h3 className="charts__class">BankNifty</h3>
                        <iframe className="charts__class" src="https://tvc4.forexpros.com/init.php?pair_ID=17950&domain_ID=56&lang_ID=…ssion=session&interval=16&client=1&user=0&site=https://in.investing.com" width="1000" height="600">…</iframe>
                        {/* <iframe className="charts__class" src="https://tvc4.forexpros.com/init.php?pair_ID=17950&domain_ID=56&lang_ID=56&timezone_ID=23&refresh=16&session=session&interval=16&client=1&user=0&site=https://in.investing.com" width="800" height="700">…</iframe> */}
                    </div>
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
    
    return loading ? <h1>Loading...</h1> : chartsPage();
}

export default Charts
