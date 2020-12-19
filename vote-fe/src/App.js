import React, { useEffect, useState} from 'react';

import './App.css';
import{
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import axios from 'axios';
import Home from './Home.js';
import Login from './Login.js'
import CreateVote from './CreateVote.js'
import ViewVote from './ViewVote.js'
import Register from './Register.js'
import Content from './Content.js'






function App() {
  // var[isLogin, setIsLogin] = useState(false)

  var history = useHistory()
  var [userInfo,setUserInfo] = useState()

  useEffect(()=>{
    axios.get('/userinfo').then(res=>{
      setUserInfo(res.data)
      // history.push('/home')
      // setIsLogin(true)
    }).catch(e=>{
      console.log('用户未登录将显示登录界面')
      history.push('/content')
    })
  },[])
 
  return (
      // <div style={{
      //       height:630,
      //       backgroundImage:"url(" + require ("../src/logo.png")+")"
      //   }}>
      <div className='apps'>
      <div className="App">

        <Switch>
          <Route path="/" exact>
            <Redirect to="/content"/>
          </Route>
          <Route path="/content" >
            <Content />
          </Route>
          <Route path="/register">
           <Register/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home userInfo={userInfo} setUserInfo={setUserInfo}/>
          </Route >
          <Route path="/create-vote">
            <CreateVote/>
          </Route >
          <Route path="/vote/:id">
            <ViewVote userInfo={userInfo}/>
          </Route>
        </Switch>
     
      </div>
      </div>
   
  );
}

export default App;
