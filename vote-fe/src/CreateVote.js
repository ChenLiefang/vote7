import axios from 'axios';
import React from 'react';
import {useInput,useBoolean,useArray} from 'react-hanger'
import { useHistory, useLocation } from 'react-router-dom';
import './CreateVote.css'
import { Input,Switch,Button} from 'antd';

import{createFromIconfontCN} from '@ant-design/icons'

const MyIcon = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_2120810_mxc1lyc0fd.js'
})


function useQuery(){
    return new URLSearchParams(useLocation().search)
}
function onChange(checked) {

    console.log(`switch to ${checked}`);
  }


export default function CreateVote(){
    var query =useQuery()
    var options = useArray(['',''])
    var title = useInput()
    var desc = useInput()
    var deadline = useInput()
    var anonymous = useBoolean()
    var isMultiple = useBoolean(query.get('multiple') === '1' ? true : false)
    var history = useHistory()
  


    function handleDeleteOption(idx){
        
        if(options.length === 2){
            return 
        }
        options.removeIndex(idx)
    }

    async function createVote(){
        try{
           
       await axios('/vote',{
            method:'post',
            data: {
                   
                    title: title.value,
                    desc: desc.value,
                    options: options.value,
                    deadline: new Date(deadline.value).toISOString(),
                    anonymous: anonymous.value ? 1 : 0,
                    isMultiple:isMultiple.value ? 1 : 0
                }
               
        } ).then((res)=>{
                history.push(`/vote/`+ res.data.voteId)
                
            })
            console.log('创建成功')

            
        }catch(e){
            alert('创建失败')
        }
    }
    
    return (
        <div>
            <h3>创建单选投票</h3>
            <div>
                <Input className="create-input" type="text" value={title.value} onChange={title.onChange} placeholder="投票标题" bordered={false} />
                <Input className="create-input" type="text"  value={desc.value} onChange={desc.onChange} placeholder="补充描述（选填）" bordered={false} />
                <ul style={{listStyle:"none",padding:0,margin:0}}>
                    {
                        options.value.map((it,idx)=> {
                            return (<li key ={idx} >
                                <Button type='link'  onClick={()=>handleDeleteOption(idx)}><MyIcon type="icon-weibiaoti-1"/>
                                </Button>
                                <Input className="create-input" style={{width:352}} type="text" value={it} onChange={(e)=>options.setValue([...options.value.slice(0,idx),e.target.value,...options.value.slice(idx + 1)])} placeholder="选项" bordered={false} />
                            </li>)
                        })
                    }
                </ul>
                <Button className="create" type='link' onClick={()=>options.push('')}><MyIcon type="icon-add-fill"/>添加选项</Button>
            </div>
            <div className="create-x"></div>
                <div className="create-bottom">
                    <div >截止日期<Input  value={deadline.value} onChange={deadline.onChange} type="datetime-local" bordered={false} style={{width:300,textAlign:"right"}}/></div><hr/>
                    
                    <div>  匿名投票 <Switch style={{position:"relative",left:220 }} onChange={onChange} onClick={anonymous.toggle} /> 

                    <Input style={{width:260,display:"none"}} checked={anonymous.value}  type="checkbox" bordered={false} />
                       
                    </div><hr/>
                    <div>是否多选<Input style={{width:260,display:"none"}}  checked={isMultiple.value} onChange={isMultiple.toggle} type="checkbox" bordered={false}  />
                    <Switch style={{position:"relative",left:220 }}  onChange={onchange}  onClick={isMultiple.toggle}/></div>
                </div>
                <Button type="primary" style={{width:200,margin:20}} onClick={createVote}>创建</Button>

            </div>
       
    )
}