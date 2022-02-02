import React from 'react';
import { Container, Button, Dropdown, DropdownButton} from "react-bootstrap";
// import Dropdown from 'react-bootstrap/Dropdown'
import "./PostBox.css";
import picon from "../../images/camera-outline.svg";
import ficon from "../../images/document-attach-outline.svg";
import licon from "../../images/link-outline.svg";
import sicon from "../../images/send-outline.svg";



function PostBox(){
    return(
        <Container className = "PostBox">
            <div >
                <input className = "commentBox"placeHolder = "What's on your mind?" />
            </div>    
            <div className = "buttons">
                <Button className = "icon"> 
                        <img src = {picon} className = "images" alt = ""/>
                        {/* <span>photo</span> */}
                </Button>
                <Button className = "icon">
                    <img src = {ficon} className = "images" alt = ""/>
                    {/* <span>pdf</span> */}
                </Button>
                <Button className = "icon">
                    <img src = {licon} className = "images" alt = ""/>
                    {/* <span>link</span> */}
                </Button>
                <Button className = "icon">
                    <img src = {sicon} className = "images" alt = "" />
                    {/* <span>post</span> */}
                </Button>
                
                <div class="dropdown">
                    <button class = "dropbtn">Tag</button>
                    <div class = "dropdown-content">
                    <a href = "#">Job-Recruitment</a>
                    <a href = "#">Knowledge Sharing</a>
                    <a href ="#">Inspiration</a>
                    <a href = "#">Others</a>
                    </div>
                </div>

            </div>         
            
        </Container>    
    );    
}

export default PostBox;
