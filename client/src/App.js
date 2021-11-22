import React from 'react';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Topbar from './components/topbar'
import Project from './components/Project'
import NewProject from './components/NewProject'
import Profile from './components/Profile';
import axios from 'axios'
import {useEffect} from 'react'
import { login } from './loginSlice';
import { useDispatch,useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

function App() {

  const description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  const dispatch = useDispatch();
  const loginState = useSelector((state)=>state.loginState)
  const history = useHistory()

  useEffect(()=>{


    axios.get('/api/user/verifyToken')
    .then((res)=>{
      console.log(res.data)
      const {user,accessToken} = res.data;
      dispatch(login({isLoggedIn:true,user,accessToken}))
    })
    .catch((err)=>{
      dispatch(login({isLoggedIn:false,user:{}}))
      history.push('/login')
    })


  },[])


  return (
    <div >
        <Topbar />

        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/project/:id">
            <Project
              name="QuickPoll"
              owner="Ansh Malik"
              description={description}
              repo="https://github.com/quickpoll"
              link="https://quickpoll-herokuapp.com"
              stars={23}
            />
          </Route>

          <Route path="/new">
            <NewProject/>
          </Route>

          <Route path="/profile/:id">
            <Profile/>
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
    </div>

  );
}

export default App;
