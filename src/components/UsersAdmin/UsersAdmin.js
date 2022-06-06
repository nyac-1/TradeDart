import React , {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {auth, db} from "../../firebase.js";
import './UsersAdmin.css';

function Users() {

    const history = useHistory("");
    const [loading, setLoading] = useState(true);
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

    var counter = 0;
    const addRow = (data)=>{

        var cls = (counter%2) ? "none" : "active-row";
        counter++;

        return(
            <tr className = {cls}>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>{data.dob}</td>
            </tr>
        );
    };

    const search = (value)=>{
        var smth = []
        value = value.trim();
        users && users.map((data)=>{
            if((data.name.toLowerCase()).includes(value.toLowerCase()) || (data.phone.toLowerCase()).includes(value) || (data.email.toLowerCase()).includes(value)){
                smth.push(data);
            }
        });
        setSearch(smth);
    };
    
    const usersList = ()=>(
        <div className = "userslist">
            <div className = "userslist__inner">
                <div className ="userslist__inner__title"><h1>Users List</h1></div>
                        
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && users.map((data)=>(addRow(data)))
                                }
                            </tbody>
                        </table>
                        <input autoComplete = "off" onChange = {(e)=>{search(e.target.value);}} type = "text" placeholder = "Search Users" id = "search_cred"/>
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchValues && searchValues.map((data)=>(addRow(data)))
                                }
                            </tbody>
                        </table>
            </div>
        </div>
    );


    return loading ? <h1>Loading...</h1> : usersList();
}

export default Users
