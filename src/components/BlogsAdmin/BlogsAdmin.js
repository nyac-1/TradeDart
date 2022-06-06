import React , {useState, useEffect} from 'react';
import './BlogsAdmin.css';

import {Form, Typography, Button, message} from "antd";
import QuillEditor from "../BlogsAdmin/editor/QuillEditor.js";
import {auth, db} from "../../firebase.js";
import {useHistory} from "react-router-dom";

function BlogsAdmin() {

    const history = useHistory("");

    const { Title } = Typography;

    const [content, setContent] = useState("");
    const [title, setTitle]  = useState("");

    const onEditorChange = (value)=>{
        setContent(value);
        console.log(value); 
    };

    const onSubmitBlog = (e)=>{
        e.preventDefault();

        if(title.length == 0){
            alert("Title Required");
            return;
        }

        var value = content;
        value = value.replace(/<p>/g,"");
        value = value.replace(/<\/p>/g,"");
        value = value.replace(/<br>/g,"");
        value = value.replace(" ","");

        if(value==""){
            alert("No content to submit");
            return;
        }

        var dt = new Date();
        var utcDate = dt.toUTCString().split(" ");

        db.collection("blogs").doc(title).set({
            title,
            html_content: content,
            date: utcDate[1]+" "+utcDate[2]+" "+utcDate[3],
            likes: 0,
            dislikes: 0
        });

        history.push("/secret");
        console.log("Button pressed");
    }

    return (
        <div className = "blogs">
            <div className="blogs__inner">
                <div className ="blogs__inner__title">
                    <Title>Editor</Title>
                </div>

                <div className = "blogs__inner__unique__title"> 
                    <label>Title :</label>
                    <input type = "text" placeholder = "Enter Title" onChange = {(e)=>{setTitle(e.target.value)}} />
                </div>

                <div className = "QuillEditor__editor">
                    <QuillEditor
                        placeholder = {"Start Typing"}
                        onEditorChange = {onEditorChange}
                    />
                </div>

                <div className="blogs__button">
                    <Button 
                    size = "large"
                    htmlType = "submit" 
                    className = "blogs__button__button"
                    onClick = {onSubmitBlog}> Submit
                    </Button>
                </div>
                <div className = "space">
                    <br/><br/>
                </div>

            </div>
        </div>
    )
}

export default BlogsAdmin;
