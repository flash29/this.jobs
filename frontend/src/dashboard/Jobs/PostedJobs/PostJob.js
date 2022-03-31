import React from 'react';
import { Container, Button} from "react-bootstrap";
import  { useParams } from "react-router-dom";
import "./PostJob.css";

import { useState} from 'react';
import sicon from "../../../images/send-outline.svg";
import styled from 'styled-components';
import picon from "../../../images/camera-outline.svg";

const Button1 = styled.button`
  position: relative;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 10%;
  margin-right : 10px;
  width: 6%;
  height: 5%;
  background: transparent;
`;

function PostBox(props){

        let params = useParams();
        const [postData, setPostData] = useState({ 
            userId : 1, 
            content : 'Job desc', 
            company : 'Google',
            validTill : 1648487629
        });  

        let userid = sessionStorage.getItem('userid');
        postData.userId = Number(userid)

        const [base64File, setBase64URL] = useState('');

        const handleFileInputChange = e => {
            console.log(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = function() {
                setBase64URL(reader.result);
                setPostData({...postData, attachments : reader.result })
            console.log('result', reader.result);
            console.log("file result", base64File);
            }
            if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            console.log('reader',reader);
            }
            
        };

        const hiddenFileInput = React.useRef(null);

        const handleClick = event => {
            hiddenFileInput.current.click();
        };

        function handleSubmit(){
            console.log(postData.userId);
            fetch('/jobpost', {
                method : 'POST', 
                headers:{'Content-type':'application/json'},
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(postData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                setPostData({ userId : userid, content : '', validTill : 1648487629});
                window.location.reload(false)
            }).catch(error => console.log('error', error))
        }

        return(
            <Container className = "PostBox1">
                <div >
                    <input className = "commentBox1" placeholder = "Job description"  onChange = { (e) => setPostData({...postData, content : e.target.value})}/>
                </div>    
                <div className = "buttons1">
                    <div className ="dropdown1">
                            <input className = "dropbtn1" placeHolder = "Company" onChange = {(e) => setPostData({...postData, company: e.target.value}) }/>  
                    </div>
                    <div className ="dropdown1">
                            <input className = "dropbtn1" placeholder = "Last date to apply" onChange = {(e) => setPostData({...postData, validTill : e.target.value}) }/>  
                    </div>

                    <>
                        {/* <Button1 onClick={handleClick}>
                            <img src = {picon} className = "images1" alt = ""/>
                        </Button1> */}
                        <input
                            type="date"
                            ref = {hiddenFileInput}
                            style={{display: 'none'}}
                            onChange = {handleFileInputChange}/>
                    </>

                    <Button className = "icon1" type = "submit" onClick={handleSubmit}>
                        <img src = {sicon} className = "images1" alt = "" />
                    </Button>  
                </div>         
            </Container>    
        );    
    }

export default PostBox;
