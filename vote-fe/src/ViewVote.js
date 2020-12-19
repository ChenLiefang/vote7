import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import './ViewVote.css'
import {groupBy} from 'lodash'

import{createFromIconfontCN} from '@ant-design/icons'

const MyIcon = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_2120810_48s2tum3j4d.js'
})



export default function ViewVote({userInfo = {} }){
    var {id} = useParams() //问题id 
    var [loading, setLoading] = useState(true)
    var [voteInfo,setVoteInfo] = useState(null)
    var [votings,setVotings] = useState(null)

    if(!loading){
        var groupedVotings = groupBy(votings,'optionId')
        var uniqueUsersCount = new Set(votings.map(it => it.userId)).size
    }
    useEffect(()=>{
        setVoteInfo(null)
        setLoading(true)

        Axios.get(`/vote/${id}`).then((res)=>{
            console.log(res.data)
            setVoteInfo(res.data)
            setVotings(res.data.votings)
            setLoading(false)
        })

    },[id])
 
    useEffect(()=>{
        //用于接收某个vote的新的选票信息的
        var ws = new WebSocket(`ws://localhost:8081/vote/${id}`)

        ws.onmessage = e=>{
            setVotings(JSON.parse(e.data)) 
        }

        return ()=> ws.close()

    },[id])

    async function voteUp(optionId,hasVoted){
        //如果当前时间大于投票截止时间，就什么也不做
        if(Date.now() > new Date(voteInfo.deadline).getTime()){
            alert('该投票已过截止时间，不能在参与')
            return 
        }
        //要区分单选和多选，还要区分是否已经选过当前选项
        if(!hasVoted){
            var thisVotings = {
                id:-1,
                optionId:optionId,
                voteId:id,
                userId:userInfo.id,
                avatar: userInfo.avatar,
            }
            console.log('增加本次投票')
            setVotings([...votings,thisVotings])
        }else{
            var filterVotings = votings.filter(it=>{
                return !(it.userId === userInfo.id &&  optionId === it.optionId)

            })
            setVotings(filterVotings)
        }



        var res = await Axios.post(`/voteup/${id}`,{
            optionId,
            isVoteDown:hasVoted
        })
        console.log(res.data)

    }
    if(loading){
        return <div>loading</div>
    }

    function calcRatio(num, base){
        if(base === 0){
            return 0
        }
        return (num / base * 100 ).toFixed(2)

    }

    return (
    <div>
        <h2>{voteInfo.title}</h2>
        <p>{voteInfo.isMultiple ? '[多选]':'[单选]'}{voteInfo.desc}</p>
        <ul className="viewlist">
            {
                voteInfo.options.map((option)=>{
                var currVotings =groupedVotings[option.id] || [] //当前选项的每一票
                console.log(userInfo,option)
                //当前用户有没有选中这个选项
                var hasCurrUserVoted = !!currVotings.find(it => it.userId === userInfo.id)
                console.log(hasCurrUserVoted)

                    return <li   key={option.id} onClick={()=>voteUp(option.id,hasCurrUserVoted)}>
                        <label  for="a">
                        <span className="option-text">{option.content}</span></label>
                        {
                            hasCurrUserVoted ? <MyIcon style={{paddingRight:50}} type="icon-correct-1-mini1"/> : <MyIcon style={{paddingRight:70}} type="icon-kongbai"/>
                        }
                        <input id="a" className="inputlist" type="checkbox" checked={hasCurrUserVoted} />
                        
                        
                        {' '}

                        {' '}
                        <strong > {currVotings.length}票 {calcRatio (currVotings.length , uniqueUsersCount )}%</strong>
                        <div className="option-ratio" style={{width: calcRatio (currVotings.length, uniqueUsersCount)+'%'}}></div>
                            <ul className="avatars">
                                {
                                    currVotings.map(voting=>{
                                        return <li><img className="avatar" alt="" src={voting.avatar}/></li>
                                    })
                                }
                            </ul>
                    </li>
                })
            }
        </ul>
        <p>投票截至：{new Date(voteInfo.deadline).toISOString()}</p>
    </div>
    )
}