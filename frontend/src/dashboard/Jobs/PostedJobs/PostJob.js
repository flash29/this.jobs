import React from 'react';
import { Container, Button} from "react-bootstrap";
import "./PostJob.css";

import { useState} from 'react';
import sicon from "../../../images/send-outline.svg";


import PostAlert from '../../../components/PostBox/PostAlert';


function PostJob(props){

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
        const [message, setMessage] = useState("");
        const [status, setStatus] = useState(false);

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
                headers:{'Content-type':'application/json', 'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(postData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                console.log(data.error);

                if(data.error === undefined){
                    setMessage("Post Created!");
                    setStatus(true); 
                }
                else{
                    setMessage(data.error)
                    setStatus(true);
                }

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
                    <h1 className='titleToHover'>Create a Job Post!</h1>
                    <div >
                        <input className = "commentBox1" id="companyNameInput" placeholder = "Company" onChange = {(e) => {setPostData({...postData, org: e.target.value}); console.log(postData.org) }}/>
                        <input className = "commentBox1" id="jobTitleInput" placeholder = "Job Title"  onChange = { (e) => setPostData({...postData, jobTitle : e.target.value })}/>   
                    </div> 
                    <div className = "buttons1">
                        <textarea className = "descrptionBox" placeholder = "Description" id="descriptionInput" onChange = { (e) => setPostData({...postData,  content : e.target.value})}/>   
                    </div>
                    <div className = "buttons1">
                        <div className ="dropdown1">
                                <input className = "dropbtn1" placeholder = "Location" id="locationInput" onChange = {(e) => setPostData({...postData, location: e.target.value}) }/>  
                        </div>
                        <div className ="dropdown1">
                                <input className = "dropbtn1" placeholder = "salary" id="salaryInput" onChange = {(e) => {setPostData({...postData, salary : e.target.value}); console.log(postData.salary);} }/>  
                        </div>
                        <div className ="dropdown1">
                                <input className = "dropbtn1" type = "date" placeholder = "Last date to apply" id="dateInput" onChange = {(e) => setPostData({...postData, validTill : (e.target.value) } ) }/>  
                        </div>
                        <Button className = "icon1" type = "submit" id ="submitNewJobPosting" onClick={handleSubmit} placeholder = "">
                            <img src = {sicon} className = "images1" alt = "" />
                        </Button>  
                    </div>
                </div>   
                <PostAlert trigger = {status} url = "/home" msg = {message} setStatus = {setStatus}>
                    <h1>Alert!</h1>
                    <h3>{message}</h3>
                </PostAlert>        
            </Container>    
        );    
    }

export default PostJob;
