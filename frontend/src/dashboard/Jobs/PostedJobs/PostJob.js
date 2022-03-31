import React from 'react';
import { Container, Button} from "react-bootstrap";
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

        const [postData, setPostData] = useState({ 
            jobId : '1',
            createdBy : 'user1', 
            content : '', 
            createdAt : 1648487349,
            updatedAt : 1648487629,
            appliedUsersList : null,            
            attachments : '',
            validTill : 1648487629
        });  

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
            console.log(postData);
            fetch('/jobpost', {
                method : 'POST', 
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(postData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                setPostData({ createdBy : 'user1', content : '', tag : '', attachments : ''});
                window.location.reload(false)
            }).catch(error => console.log('error', error))
        }

        return(
            <Container className = "PostBox">
                <div >
                    <input className = "commentBox" placeholder = "Job description"  onChange = { (e) => setPostData({...postData, content : e.target.value})}/>
                </div>    
                <div className = "buttons">
                    <div className ="dropdown">
                            <input className = "dropbtn" placeHolder = "Job-Id" onChange = {(e) => setPostData({...postData, jobId : e.target.value}) }/>  
                    </div>
                    <div className ="dropdown">
                            <input className = "dropbtn" placeHolder = "Last date to apply" onChange = {(e) => setPostData({...postData, validTill : e.target.value}) }/>  
                    </div>

                    <>
                        <Button1 onClick={handleClick}>
                            <img src = {picon} className = "images" alt = ""/>
                        </Button1>
                        <input
                            type="file"
                            ref = {hiddenFileInput}
                            style={{display: 'none'}}
                            onChange = {handleFileInputChange}/>
                    </>

                    <Button className = "icon" type = "submit" onClick={handleSubmit}>
                        <img src = {sicon} className = "images" alt = "" />
                    </Button>  
                </div>         
            </Container>    
        );    
    }

export default PostBox;
