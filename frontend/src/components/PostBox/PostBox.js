import React from 'react';
import { Container, Button} from "react-bootstrap";
import "./PostBox.css";
import PostAlert from './PostAlert';

import { useState} from 'react';
import sicon from "../../images/send-outline.svg";
import licon from "../../images/link-outline.svg";
import ficon from "../../images/document-attach-outline.svg";
import styled from 'styled-components';
import picon from "../../images/camera-outline.svg";

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
            createdBy : 'userName', 
            creatorId : 1,
            content : '', tag : '', 
            attachments : ''
        });  
        const [base64File, setBase64URL] = useState('');
        const [message, setMessage] = useState("");
        const [status, setStatus] = useState(false);

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
            postData.createdBy = sessionStorage.getItem('username');
            postData.creatorId = Number(sessionStorage.getItem('userid'));
            console.log(postData.creatorId);
            console.log(postData);
            fetch('/post', {
                method : 'POST', 
                headers:{'Content-type':'application/json'}, 
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(postData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                console.log(data.error);

                if(data.error == undefined){
                    setMessage("Post Created!");
                    setStatus(true); 
                }
                else{
                    setMessage(data.error)
                    setStatus(true);
                }

                setPostData({ createdBy : 'user1', content : '', tag : '', attachments : ''});
                window.location.reload(false)
            }).catch(error => console.log('error', error))
        }

        return(
            <Container className = "PostBox">
                <div className = "box ">
                    <h1 className = "titleToHover" >Create a Post!</h1>
                    <div >
                        <input type = "text" className = "textBox" placeholder = "What's on your mind?"  onChange = { (e) => setPostData({...postData, content : e.target.value})}/>
                    </div>    
                    <div className = "buttons25">
                        <div className ="dropdown">
                                <select className = "dropbtn" onChange = {(e) => setPostData({...postData, tag : e.target.value}) }>
                                    <option value = "1" id = "SelectTag" >Select Tag</option> 
                                    <option value = "Job-Recruitment" id="JobRecruitment" >Job-Recruitment</option>
                                    <option value = "Knowledge Sharing" id="KnowledgeSharing" >Knowledge Sharing</option>
                                    <option value = "Inspiration" id="Inspiration" >Inspiration</option>
                                    <option value = "Others" id="Others" >Others</option>    
                                </select>
                        </div>

                        <>
                            <Button1 onClick={handleClick}>
                                <img src = {picon} className = "images" alt = ""/>
                            </Button1>
                            <input
                                type="file"
                                ref = {hiddenFileInput}
                                style={{display: 'none'}}
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange = {handleFileInputChange}
                                id="inputPhotoPost"
                                />
                        </>


                        {/* <>
                            <Button1 onClick={handleClick}>
                                <img src = {ficon} className = "images" alt = ""/>
                            </Button1>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange = {handleFileInputChange}
                                style={{display: 'none'}}
                            />
                        </>
                        <>
                            <Button1 onClick={handleClick}>
                                <img src = {licon} className = "images" alt = ""/>
                            </Button1>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange = {handleFileInputChange}
                                style={{display: 'none'}}
                            />
                        </> */}

                        <Button className = "postButton" type = "submit" onClick={handleSubmit}>
                            {/* <img src = {sicon} className = "images" alt = "" /> */}
                            Post
                        </Button>  
                    </div> 
                    <br></br>
                </div>     
                <PostAlert trigger = {status} url = "/home" msg = {message} setStatus = {setStatus}>
                    <h1>Alert!</h1>
                    <h3>{message}</h3>
                </PostAlert>   
            </Container>    
        );    
    }

export default PostBox;