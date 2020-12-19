import Axios from 'axios'
import React, {  useState } from 'react'
import {Button,Input} from 'antd'
import { useHistory } from 'react-router-dom'
import './Login.css'




export default function Login(props){
    
    var history = useHistory()
    let [nameValue, setname] = useState('')
    let [passwordValue, setpassword] = useState('')
    let [captchaValue, setcaptcha] = useState('')

    async function handleLogin(e){
        e.preventDefault()
      var res=await Axios('http://localhost:3000/login',{
            method:'post',
            withCredentials:true, 
            data:{
                name:nameValue,
                password:passwordValue,
                captcha:captchaValue,
            }
        })
        
        if(res.data.code === 0){
            props.onLogin && props.onLogin(res.data)
            history.push('/home')
        }else{
            alert(res.data.msg)
        }
    }


    return (
        // <div style={{
        //     height:630,
        //     backgroundImage:"url(" + require ("../src/logo.png")+")"
        // }}>
            <div className="login">
                <form className="login-from" onSubmit={handleLogin}>
                    <Input addonBefore="Username:"  style={{width:300}} type="text"  onInput={(e)=>setname(e.target.value)} value={nameValue}/><br/>
                    <Input addonBefore="Password:" style={{width:300,margin:10}} type="password" onInput={(e)=>setpassword(e.target.value)} value={passwordValue}/><br/>
                    <img src="http://localhost:8081/captcha" alt=""/><br/>
                    <Input addonBefore="captcha:"  style={{width:300}} type="text"  onInput={(e)=>setcaptcha(e.target.value)} value={captchaValue}/><br/>
                    <Button htmlType="submit" type="primary" style={{width:200,margin:20}}>登录</Button>
                </form>
            </div>
        // </div>
    )
}