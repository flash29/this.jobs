import React from 'react';
import { Container, Button} from "react-bootstrap";
import "./PostBox.css";

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

        const [postData, setPostData] = useState({ createdBy : '1', content : '', tag : '', attachments : ''});  

        const getBase64 = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            return base64;
          }
        
        const convertBase64  = (file) => {
            return new Promise((resolve, reject) =>{
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                resolve(fileReader.result);
              };
              fileReader.onerror = (error) => {
                console.log(error);
              };
            });
          }

        const hiddenFileInput = React.useRef(null);

        const handleClick = event => {
            hiddenFileInput.current.click();
        };

        function handleSubmit(){
            fetch('http://localhost:8080/post', {
                method : 'post', 
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({postData})
            }).then(response => response.json()).then(data => {
                console.log(data);
                setPostData({ createdBy : '1', content : '', tag : '', attachments : ''});
            }).catch(error => console.log('error', error))
        }

        return(
            <Container className = "PostBox">
                <div >
                    <input className = "commentBox" placeholder = "What's on your mind?"  onClick = { (e) => setPostData({...postData, content : e.target.value})}/>
                </div>    
                <div className = "buttons">
                    <div className ="dropdown">
                            <select className = "dropbtn" onClick = {(e) => setPostData({...postData, tag : e.target.value})}>
                                <option value = "1">Select Tag</option> 
                                <option value = "Job-Recruitment">Job-Recruitment</option>
                                <option value = "Knowledge Sharing">Knowledge Sharing</option>
                                <option value = "Inspiration">Inspiration</option>
                                <option value = "Others">Others</option>    
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
                            onChange = { (e) => setPostData({...postData, attachments : getBase64(e)})}/>
                    </>


                    <>
                        <Button1 onClick={handleClick}>
                            <img src = {ficon} className = "images" alt = ""/>
                        </Button1>
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange = { (e) => setPostData({...postData, attachments : getBase64(e)})}
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
                            onChange = { (e) => setPostData({...postData, attachments : getBase64(e)})}
                            style={{display: 'none'}}
                        />
                    </>

                    <Button className = "icon" type = "submit" onClick={handleSubmit}>
                        <img src = {sicon} className = "images" alt = "" />
                    </Button>  
                </div>         
            </Container>    
        );    
    }

export default PostBox;
