

import React, { useState } from 'react'
import './Content.css'
import Login from './Login'
import Register from './Register'

export default function Content(){

 

    function Demo(){
        let [active ,setActive] = useState(0)
        return (
            <div className="container">
                <div className="con">
                    <div className={active === 0 ? "sign-in active" :"sign-in"} onClick={()=>setActive(0)}>用户登录</div>
                    <div className={active === 1 ? "sign-up active" :"sign-up"} onClick={()=>setActive(1)}>用户注册</div>
                </div>
                {
                    active === 0 ? <Login/>: <Register/>
                }
            </div>
        )
    }




    return(
        <div>
            <div ><h5>腾讯投票网页版</h5></div>
           <Demo/>

        </div>
           
    )

}