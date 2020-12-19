import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Button } from 'antd'

import{createFromIconfontCN} from '@ant-design/icons'
import './My.css'
import './ViewVote.js'
import './CreateVote.js'


const MyIcon = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_2120810_2ihsi8po5qe.js'
})
export default function My(){
    var [userInfo,setUserInfo] = useState()
    var history = useHistory()
    var [myVotes, setMyVotes,] = useState([])

    function logout(){
        Axios.get('/logout').then(()=>{
            history.push('/Content')
        })
    }
   let handleRemoveItem = useCallback((voteId)=>{
           Axios.delete(`/vote/${voteId}`)
               setMyVotes(myVotes.filter(it=>it.id !== voteId))
                },[myVotes])   
                       
    useEffect(()=>{
    Axios.get('/myvotes').then(res=>{
        setMyVotes(res.data)
    })
    },[])

    useEffect(()=>{
        Axios.get('/userinfo').then(res=>{
          setUserInfo(res.data)
          // history.push('/home')
          // setIsLogin(true)
        }).catch(e=>{
          alert('用户未登录将显示登录注册界面')
          history.push('/login')
        })
      },[])
      


  
 

    return (
        <div>我创建的投票列表
            <ul style={{padding:0,margin:0,listStyle:"none"}}>
                {
                    myVotes.map((vote)=>{
                        return (
                             <li className="mylist" >


                                <Link to={`/vote/${vote.id}`}><span >{vote.title}</span></Link>

                               <Button type="text" style={{position:"relative",left:100}} onClick={()=>handleRemoveItem(vote.id)} >
                                   <MyIcon style={{fontSize:22}} type="icon-laji"/>
                                   <span style={{fontSize:6 ,margin:0}}>删除</span>
                                </Button>
                            </li>
                            )
                            
                        })
                }
               
            </ul>
        <Button type="primary" style={{width:150,marginTop:15}} onClick={logout}>退出登录</Button>
        </div>
    )
}