import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import './ForumsDelete.css';

function ForumsDelete() {

    const history = useHistory("");
    const [loading, setLoading] = useState(true);
    const [forums, setForums] = useState([]);    

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

    const deleteTheForum = (data)=>{
        console.log(forums);
        db.collection('forums').doc(data.main).delete().then(() => {
            var tempforums = forums;
            tempforums = tempforums.filter(blog => {
                return blog.title != data.title
            })
            setForums(tempforums);
        })
    }

    const forumsDelete = ()=>(
        <div className = "forums">
            <div className = "forums__inner" id = "main_box">
                <div className ="forums__inner__title">
                        <h1>Forums</h1>
                </div>
                {
                    forums && forums.map((data)=>(
                        <div className = "forums__item">
                            <span className = "forums__item__info">Title: {data.title}</span>
                            <span className = "forums__item__info">Created by: {data.createdBy}</span>
                            <div onClick={() => deleteTheForum(data)}>
                                <Link>Delete</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

    return loading ? <h1>Loading...</h1> : forumsDelete();
}

export default ForumsDelete
