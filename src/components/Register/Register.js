import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js"
import "./Register.css";

function Register() {

    document.title = 'Register';

    const history = useHistory("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confPwd, setConfPwd] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState(""); 

    const [{isAuthenticated}, dispatch] = useStateValue();


    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
    }, [isAuthenticated])

    function register(e){
        e.preventDefault();

        if(pwd.length < 7){
            alert("Minimum password length is 7");
            return;
        }

        if(pwd != confPwd) {
            alert("Passwords should be same.");
            return;
        }


        if(gender=="Nan" || gender==""){
            alert("Fill gender field");
            return;
        }

        if(firstName=="" || lastName==""){
            alert("Fill all the name fields");
            return;
        }

        if(phone.search(/^(\+\d{1,2}\s)?\d{10}$/) == -1){
            alert("Phone not formatted properly");
            return;
        }

        if(dob==""){
            alert("Enter date of birth");
            return;
        }
        else{
            var arr = dob.split("-");
            var str = arr[1]+"-"+arr[2]+"-"+arr[0];
            var month_diff = Date.now() - new Date(str);
            var year = new Date(month_diff).getUTCFullYear();   
            var age = Math.abs(year - 1970);

            if(age<12){
                alert("You must be 12 or older to join, Come back later");
                return;
            }
        }

        if(email.search(/^[a-zA-Z0-9][a-zA-Z0-9+.-_]*@[a-zA-Z0-9]+[\.]\w{2,3}$/) == -1){
            alert("Email not formatted properly");
            return;
        }

        auth.createUserWithEmailAndPassword(email,pwd)
        .then((auth)=>{
            auth.user.updateProfile({
                displayName: firstName + " " + lastName,
                phoneNumber: phone
            }).then(() => {
                db.collection('users').doc(auth.user.uid).set({
                    name: firstName + " " + lastName,
                    email,
                    dob,
                    phone,
                    gender,
                    profilePhoto: "https://waghostwriter.com/wp-content/uploads/2021/03/drizzyyy.jpg"
                });

                auth.user.sendEmailVerification().then(function() {
                    alert("Check your mail for verification");
                    history.push("/login");
                  }).catch(function(error) {
                    alert(error.message);
                  });
                
                setFirstName("");
                setLastName("");
                setPhone("");
                setEmail("");
                setPwd("");
                setConfPwd("");
                setDob("");
                setGender("");
            })
        })
        .catch((err) => {
            alert(err.message)
        })

    }



    return (
        <div className = "root">
            <div className = "registerheader">
                <nav className = "registerheader__registernav">
                    <Link className = "registerheader__registernav__link" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>

                    <div className = "registerheader__registernav__item">
                        <Link className = "registerheader__registernav__item__link" to ="/login">
                            <p>Login</p>
                        </Link>
                    </div>
                </nav>  
            </div>
            <div className = "register">
            <div className = "register__container">
                <h3>Register</h3>

                <form className = "register__container__form">
                    <div className = "register__container__form__name">
                        <input value = {firstName} onChange = {(e)=> setFirstName(e.target.value)} type = "text" placeholder = "First Name" required="required"/>
                        <input value = {lastName} onChange = {(e)=> setLastName(e.target.value)} type = "text" placeholder = "Last Name" required="required"/>
                    </div>

                    <div className = "register__container__form__gender">
                        <label for = "gender">Gender</label>
                        <select onChange = {(e)=> setGender(e.target.value)}>
                            <option value = "Nan">Select</option>
                            <option value = "Male">Male</option>
                            <option value = "Female">Female</option>
                        </select>
                    </div>

                    <div className = "register__container__form__date">
                        <label>Date of birth</label>
                        <input value = {dob} onChange = {(e)=> setDob(e.target.value)} type="date"/>
                    </div>

                    <center>
                        <input value = {phone} onChange = {(e)=> setPhone(e.target.value)} type = "number" placeholder = "Phone Number"/>
                    </center>

                    <center>
                        <input value = {email} onChange = {(e)=> setEmail(e.target.value)} type = "email" placeholder = "Email"/>
                    </center>
                    <center>
                        <input value = {pwd} onChange = {(e)=> setPwd(e.target.value)} type = "password" placeholder = "Password"/>
                    </center>
                    <center>
                        <input value = {confPwd} onChange = {(e)=> setConfPwd(e.target.value)} type = "password" placeholder = "Confirm Password"/>
                    </center>

                    <center>
                        <button onClick = {(e) =>register(e)} className = "register__container__form__button">Submit</button>
                    </center>
                </form>

            </div>

        </div>
        <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
        </div>
        </div>
    )
}

export default Register
