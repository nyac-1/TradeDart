import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import './BlogsList.css';

function BlogsList() {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        db.collection("blogs").get()
        .then(snapshot => {
            const historyBlogs = [];
            snapshot.docs.forEach( doc => {
                let smth  = doc.data();
                historyBlogs.push(smth);
                console.log(doc.data());
            })
            setBlogs(historyBlogs);
            setLoading(false);
        })
        .catch(e=>{
            alert(e);
            setLoading(false);
        });
    }, [])

    const deleteCard = (title) => {
        db.collection('blogs').doc(title).delete().then(() => {
            var tempBlogs = blogs;
            tempBlogs = tempBlogs.filter(blog => {
                return blog.title != title
            })

            setBlogs(tempBlogs);
        })
    }

    const blogListHTML = () => (
        <div className = "blogs">
            <div className = "blogs__inner" id = "main_box">
                <div className ="blogs__inner__title">
                        <h1>Blogs</h1>
                </div>

                {
                    blogs && blogs.map(data => (
                        <div className = "blogs__item">
            <div className = "blogs__inner__item">
                <span className = "blogs__head__title">Title:</span>
                <span className = "actual__title">{data.title}</span>
            </div>
            <div className = "blogs__inner__item">
                <span className = "blogs__head__title">Date added:</span>
                <span className = "actual__date">{data.date}</span>
            </div>

            <div className = "blogs__inner__item">
                <span className = "actual__likes right">{data.likes}</span>
                <span className = "blogs__head__title right">Likes:</span>
            </div>

            <div className = "blogs__inner__item">
                <span className = "actual__dislikes right">{data.dislikes}</span>
                <span className = "blogs__head__title right">Dislikes:</span>
            </div>
            <br />
            <div className = "blogs__inner__item row_center" onClick={() => deleteCard(data.title)}>
                <Link className="link" to = "#">Delete</Link>
            </div>
     
        </div>
                    ))
                }

            </div>
        </div>
    )
    
    return loading ? <h1>Loading...</h1> : blogListHTML()
}

export default BlogsList
