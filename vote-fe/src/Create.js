import React from 'react'
import { Link} from 'react-router-dom'
import{Button} from 'antd'

export default function Create(){
    return (
        <div>
            <img src={require('../src/danxuan.jpg')} alt="" style={{width:120,margin:20}}/>
            <div className="vote"><Link to="/create-vote"><Button type="primary" style={{width:200,margin:20}}> 单选投票</Button></Link></div>
            <div style={{backgroundColor:"#EFEFF4",height:10}}></div>
            <img src={require('../src/dunxuan.jpg')} style={{width:120,margin:20}} alt="" />
            <div className="vote" ><Link to="/create-vote?multiple=1"><Button type="primary" style={{width:200,margin:20}}>多选投票</Button></Link></div>
        </div>

    )
}