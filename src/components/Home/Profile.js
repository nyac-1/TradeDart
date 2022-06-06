import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db, storage} from "../../firebase.js";
import {useStateValue} from "../../StateProvider.js";
import "./Profile.css";

function Profile() {
    document.title = 'Home';
    const history = useHistory("");
    const [{user, isAuthenticated}] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [user2, setUser2] = useState();

    useEffect(() => {
        db.collection('users').doc(user.uid).onSnapshot(doc => {
            setUser2(doc.data());
        })
    }, [])

    useEffect(() => {
       if(user!=null) {
            setLoading(false);
       }
    }, [user])

    useEffect(() => {
        if(!isAuthenticated){
            history.push('/login');
        }
        setLoading(false);
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

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
      changePhoto(image);
    }

    const changePhoto = (image) => {
        const uploadTask = storage.ref(`/profile_photos/${user.uid}`).put(image);

        uploadTask.on('state_changed', (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                alert(err);
                console.log(err)
            }, () => {
                storage.ref('profile_photos').child(`${user.uid}`).getDownloadURL()
                .then(fireBaseUrl => {
                console.log(fireBaseUrl)
                db.collection('users').doc(user.uid).update({
                    profilePhoto: fireBaseUrl
                })
            })
        })
    }

    const profileHTML = () => (
        <div className = "profile">
            <div className = "navbar">
                <nav className = "navbar__nav">
                    <Link className = "navbar__nav__link" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>

                    <div className = "navbar__nav__item">
                        <Link className = "navbar__nav__item__link" onClick = {out}>
                            <p>Sign Out</p>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className = "profile__content">
                <div className = "profile__content__bio">
                    <div className = "profile__content__bio__item"> 
                        <h1>{user.displayName}</h1>
                    </div>
                    <div className = "profile__content__bio__item" style={{cursor: 'pointer'}} onClick={() => {document.getElementById('transparentFileInput').click()}}> 
                    <input 
                        style={{display: 'none'}}
                        id="transparentFileInput"
                        accept="image/png,image/jpeg,image/jpg"
                        type="file"
                        onChange={handleImageAsFile}
                    />
                        <img id="userProfilePhoto" src={user2?.profilePhoto} height="200px" />
                    </div>

                    <div className = "profile__content__bio__item">
                        <h3>Date joined: {user.metadata.creationTime.split(" ").slice(1,4).join(" ")}</h3>
                    </div>

                    <div className = "profile__content__bio__item">
                        <h3>Email : {user.email}</h3>
                    </div>

                    <div className = "profile__content__bio__item">
                        <h3>Email verified: {user.emailVerified ? "Verified":"Not Verified"}</h3>
                    </div>
                </div>

                <div className = "profile__content__options" id = "options">
                    <div className = "profile__content__options__head">
                        <span>Actions</span>
                    </div>
                    <table>
                        <tr>
                            <td><button disabled={!user.emailVerified} onClick = {forumsView} className="button__options">Forums</button></td>
                            <td><button disabled={!user.emailVerified} onClick = {blogsView} className="button__options">Blogs</button></td>
                        </tr>
                        <tr>
                            <td><button disabled={!user.emailVerified} onClick = {chartsView} className="button__options">Charts</button></td>
                            <td><button disabled={!user.emailVerified} onClick = {usersView} className="button__options">Search Users</button></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    )

    return loading ? <div/> : profileHTML();
}

export default Profile
