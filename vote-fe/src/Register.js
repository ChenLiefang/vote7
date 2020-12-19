
import Axios from 'axios'
import React, {  useState } from 'react'

import { useHistory } from 'react-router-dom'
import { Upload, message, Button,Input, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function Register(){

    var history = useHistory()
    let [nameValue, setname] = useState('')
    let [passwordValue, setpassword] = useState('')
    let [emailValue, setemail] = useState('')

    async function onInput(){
        await Axios.get('/username-conflict-check').then((res)=>{

            // if(res.data.isOk === true){
            //     alert(res.data.msg)
               
            // }else{
            //     alert(res.data.msg)
            // }
         
          document.querySelector('.spanTip').innerText = res.data.msg
             console.log(res.data.msg)
     
    })
    } 



    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      }

    async function handleRegister(e){
        e.preventDefault()
      var res= await Axios('/username-conflict-check',{
        method:'get',
        data:
         {
                name:nameValue,
                password:passwordValue,
                email:emailValue,
            }
        })
        console.log('注册成功')

        if(res.data.isOk === true){
           
            history.push('/home')
        }else{
            alert(res.data.msg)
        }
    }
    return (
            <div className="login"style={{position:"relative"}}>
                <form className="login-from" onSubmit={handleRegister} > 
                    <Input addonBefore="Username:"  style={{width:300,paddingLeft:30,float:"left"}} type="text"  onInput={onInput}/><span  className="spanTip"></span><br/>
                    <Input addonBefore="Password:"  style={{width:300,paddingLeft:30,paddingTop:10,float:"left"}} type="password" onInput={(e)=>setpassword(e.target.value)} value={passwordValue}/><br/>
                    <Input addonBefore="电子邮件:"  style={{width:300,paddingLeft:30,paddingTop:10,float:"left"}} type="email"  onInput={(e)=>setemail(e.target.value)} value={emailValue}/><br/>
                    <Upload {...props}>
                    <span style={{width:200,position:"relative",right:38,top:5}}>头像上传:</span><Button  style={{width:185,position:"relative",right:20,top:5}} icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Button htmlType="submit" type="primary" style={{width:200,margin:20}}>注册</Button>
                </form>
            </div>
        // </div>
    )
}