import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import './Admin.css';
function Admin() {

    const history = useHistory("");

    const editBlogs = (event)=>{
        event.preventDefault();
        history.push("/secret/blogs");
    }

    const blogsFunc = (event)=>{
        event.preventDefault();
        history.push("/secret/blogsEdit");
    };

    const forumsDelete = (event)=>{
        event.preventDefault();
        history.push("/secret/forumsDelete");
    };

    const usersList = (event)=>{
        event.preventDefault();
        history.push("/secret/usersList");
    };
    return (
        <div className = 'box'>
            <div  className = "box__container">
                <div className = "box__container__item">
                    <h1>Welome Admin!</h1>
                </div>
                <div className = "box__container__item">
                    <Link className = "box__container__item__link" >
                        <button className = "button__link" onClick = {editBlogs}>Publish Blogs</button>
                    </Link>
                </div>

                <div className = "box__container__item">
                    <Link className = "box__container__item__link" to="#">
                    <button className = "button__link" onClick = {blogsFunc}>Blogs Delete</button>
                    </Link>
                </div>

                <div className = "box__container__item">
                    <Link className = "box__container__item__link" to="#">
                    <button className = "button__link" onClick = {forumsDelete}>Forum Delete</button>
                    </Link>
                </div>


                <div className = "box__container__item">
                    <Link className = "box__container__item__link" to="#">
                    <button className = "button__link" onClick = {usersList}>List Users</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Admin;
