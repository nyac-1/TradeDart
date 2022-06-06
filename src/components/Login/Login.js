import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import "./Login.css";


function Login() {
    document.title = 'Login';
    const history = useHistory("");
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('routhsampath@gmail.com');
    const [pwd, setPwd] = useState('rs46135z');

    const [{user, isAuthenticated}] = useStateValue();

    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
        setLoading(false);
    }, [isAuthenticated])

    const login = (e)=>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,pwd)
        .then((a)=>{
            history.push("/");
        })
        .catch((e)=>{
            alert(e.message);
        })
    }

    const register = (event)=>{
        event.preventDefault();
        history.push("/register");
    }

    const aboutusView = (e)=>{
        e.preventDefault();
        history.push("/aboutUs");
    }

    const loginHTML = ()=> (
        <div className = "root">
            <div className = "loginheader">
                <nav className = "loginheader__loginnav">
                    <Link className = "loginheader__loginnav__name" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>
                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {aboutusView}>
                            <p>About Us</p>
                        </Link>
                    </div>
                </nav>
            </div>
            
            <div className = "login">

                <div className = "login__container">
                    <h3>Login in to Trade-Dart</h3>

                    <form className = "login__container__form">
                        <center>
                            <input onChange = {(e)=> setEmail(e.target.value)} type = "text" placeholder = "EmailID" value = {email} />
                        </center>

                        <center>
                            <input onChange = {(e)=> setPwd(e.target.value)} type = "password" placeholder = "Password" value = {pwd}/>
                        </center>
                    
                        <center>
                            <button onClick = { login } type = "submit" className = "login__container__form__submit">Sign In</button>
                        </center>
                        <br />
                        <br />
                        <br />
                        <hr />
                        <center>
                            <Link className = "login__container__form__register"> 
                                <button onClick = { register }>Create new account</button>
                            </Link>
                        </center>
                    </form>

                </div>
            </div>
            
            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    )

    return loading? <div /> : loginHTML();
}

export default Login
