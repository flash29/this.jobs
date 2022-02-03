import React from 'react';
import { Container, Button, Dropdown, DropdownButton} from "react-bootstrap";
import "./PostBox.css";
import PhotoUploader from '../FileUploader/PhotoUploader';
import PdfUploader from '../FileUploader/PdfUploader';
import LinkUploader from '../FileUploader/LinkUploader';
import { useState, useEffect } from 'react';
import sicon from "../../images/send-outline.svg";
import FileBase from 'react-file-base64';
import axios from 'axios';


function PostBox(props){

        const [postData, setPostData] = useState({ content : '', tag : '', attachments : ''});

        const onPostClick = () => {

        }   

        const dropSelect = (e) => {
            var val = e.target.value;
            if(val == null){
                console.log("error! Tag Mandatory!");
            }
            else{
                return val;
            }
        }

        return(
            <Container className = "PostBox">
                <div >
                    <input className = "commentBox" placeholder = "What's on your mind?"  onChange = { (e) => setPostData({...postData, content : e.target.value})}/>
                </div>    
                <div className = "buttons">
                    <div className ="dropdown">
                            <select className = "dropbtn">
                                <option value = "Job-Recruitment">Job-Recruitment</option>
                                <option value = "Knowledge Sharing">Knowledge Sharing</option>
                                <option value = "Inspiration">Inspiration</option>
                                <option value = "Others">Others</option>
                                <option value = "Select Tag" selected >Select Tag</option>
                            </select>
                    </div>
                    <PhotoUploader type="file" multiple={false} onDone={ props => console.log(props.base64)} />
                    <PdfUploader type="file" multiple={false} onDone={ props => console.log(props.base64)} />
                    <LinkUploader type="file" multiple={false} onDone={ props => console.log(props.base64)} />

                    <Button className = "icon">
                        <img src = {sicon} className = "images" alt = "" />
                        {/* <span>post</span> */}
                    </Button>  
                </div>         
            </Container>    
        );    
    }

export default PostBox;
