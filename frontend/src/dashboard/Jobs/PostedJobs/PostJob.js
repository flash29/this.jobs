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

function PostJob(props){
        let params = useParams();
        const [postData, setPostData] = useState({ 
            jobId : 0, 
            userId : 1, 
            content : '',
            createdAt : 1234443546,
            updatedAt : 1786473478, 
            appliedUsersList : [],
            attachments : '',
            validTill : 14262318723,
            jobTitle : '',
            location : '',
            org : '',
            salary : ''
        });

        let userid = sessionStorage.getItem('userid');
        postData.userId = Number(userid);
        // console.log(postData.userId)

        // let jobid = sessionStorage.getTime('jobid');
        // postData.jobId = jobid

        function handleSubmit(){
            console.log("Entered submit")
            // postData.jobId = sessionStorage.getItem(jobId)
            console.log(postData);
            fetch('/jobpost', {
                method : 'POST', 
                headers:{'Content-type':'application/json'},
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(postData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                // console.log(postData);
                setPostData({ jobId : 0, 
                    userId : 1, 
                    content : '',
                    createdAt : 1234443546,
                    updatedAt : 1786473478, 
                    appliedUsersList : [],
                    attachments : '',
                    validTill : 14262318723,
                    jobTitle : '',
                    location : '',
                    org : '',
                    salary : ''});
                window.location.reload(false)
            }).catch(error => console.log('error', error))
        }

        return(
            <Container className = "PostBox1">
                <div className = "box">
                    <h1>Create a Job Post!</h1>
                    <div >
                        <input className = "commentBox1" placeholder = "Company" onChange = {(e) => {setPostData({...postData, org: e.target.value}); console.log(postData.org) }}/>
                        <input className = "commentBox1" placeholder = "Job Title"  onChange = { (e) => setPostData({...postData, jobTitle : e.target.value })}/>   
                    </div> 
                    <div className = "buttons1">
                        <textarea className = "descrptionBox" placeholder = "Description"  onChange = { (e) => setPostData({...postData,  content : e.target.value})}/>   
                    </div>
                    <div className = "buttons1">
                        <div className ="dropdown1">
                                <input className = "dropbtn1" placeholder = "Location" onChange = {(e) => setPostData({...postData, location: e.target.value}) }/>  
                        </div>
                        <div className ="dropdown1">
                                <input className = "dropbtn1" placeholder = "salary" onChange = {(e) => {setPostData({...postData, salary : e.target.value}); console.log(postData.salary);} }/>  
                        </div>
                        <div className ="dropdown1">
                                <input className = "dropbtn1" type = "date" placeholder = "Last date to apply" onChange = {(e) => setPostData({...postData, validTill : (e.target.value).getTime()}) }/>  
                        </div>
                        <Button className = "icon1" type = "submit" onClick={handleSubmit} placeholder = "">
                            <img src = {sicon} className = "images1" alt = "" />
                        </Button>  
                    </div>
                </div>        
            </Container>    
        );    
    }

export default PostJob;
