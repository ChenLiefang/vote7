
import React from 'react'
import { Link,Redirect,Route, useRouteMatch } from 'react-router-dom'
import Create from './Create'
import My from './My'
import './Home.css'
import{createFromIconfontCN} from '@ant-design/icons'

const MyIcon = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_2120810_mxc1lyc0fd.js'
})

export default function Home({userInfo,setUserInfo}){
    let {url} = useRouteMatch()
  
    return(
        <div className="home">
            <div className="home-top">
                <h5>腾讯投票</h5></div>
            <div className="home-content">
                <Route path={`${url}/`} exact>
                    <Redirect to={`${url}/create`}/>
                </Route>
                <Route path={`${url}/create`}>
                    <Create/>
                </Route>
                <Route path={`${url}/my`}>
                    <My/>
                </Route>
            </div>
             
            <div className="home-bottom">
            <div className="home-x"><MyIcon type="icon-B" /><span className="iconspan">腾讯云提供计算服务</span></div>
                {/* 嵌套路由 */}
                <Link to={`${url}/create`}><MyIcon type="icon-xinjian"/><span className="homespan">新建</span></Link>
                <Link to={`${url}/my`}><MyIcon style={{position:"relative",left:50}} type="icon-wode"/><span style={{position:"relative",left:-25}} className="homespan" >我的</span></Link>
            </div>
        
            
        </div>
        
       
    )

}