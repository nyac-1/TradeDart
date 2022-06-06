import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import './App.css';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import EmailVerification from './EmailVerification.js';
import Profile from './components/Home/Profile.js';
import Admin from './components/Admin/Admin.js';
import BlogsAdmin from './components/BlogsAdmin/BlogsAdmin.js';
import BlogsList from "./components/BlogsAdmin/BlogsList.js";
import BlogsView from './components/Blogs/BlogsView';
import Blogs from './components/Blogs/Blogs.js';
import ForumsView from './components/Forums/ForumsView.js';
import ForumsDelete from './components/ForumsAdmin/ForumsDelete.js';
import Forums from './components/Forums/Forums.js';
import Charts from './components/Charts/Charts.js';
import UsersAdmin from './components/UsersAdmin/UsersAdmin.js';
import Users from './components/Users/Users.js';
import UserView from './components/Users/UserView.js';
import AboutUs from './components/AboutUs/AboutUs.js';


import {useStateValue} from "./StateProvider.js";
import {auth} from './firebase';



function App() {

  const [{isAuthenticated},dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user_obj)=>{

      if(user_obj){
        dispatch({
          type: "UPDATE_LOGIN",
          payload: {
            user: user_obj
          }
        });
      }
      else{
        dispatch({
          type: "UPDATE_LOGOUT"
        });
      }
    });
    return () => {
      unsubscribe();
    }
  }, [isAuthenticated])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/login">
            <Login />
          </Route>

          <Route exact path = "/register">
            <Register/>
          </Route>

          <Route exact path="/_auth/verifyEmail" component={EmailVerification} />

          <Route exact path = "/">
            <Profile />
          </Route>

          <Route exact path="/secret">
            <Admin />
          </Route>

          <Route exact path = "/secret/blogs">
            <BlogsAdmin />
          </Route>

          <Route exact path = "/secret/blogsEdit">
            <BlogsList />
          </Route>

          <Route exact path = "/secret/forumsDelete">
            <ForumsDelete />
          </Route>

          <Route exact path = "/blogs/view/:blogTitle">
            <Blogs />
          </Route>

          <Route exact path = "/blogs/view">
            <BlogsView />
          </Route>

          <Route exact path = "/forums/view">
            <ForumsView />
          </Route>

          <Route exact path = "/forums/view/:forumTitle">
            <Forums />
          </Route>

          <Route exact path = "/charts">
            <Charts />
          </Route>

          <Route exact path = "/secret/usersList">
            <UsersAdmin />
          </Route>

          <Route exact path = "/users/:user_uid">
            <Users />
          </Route>

          <Route exact path = "/usersView">
            <UserView />
          </Route>

          <Route exact path = "/aboutUs">
            <AboutUs />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
