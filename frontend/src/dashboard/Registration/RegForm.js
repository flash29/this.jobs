import React, { Component } from 'react';
import { useState} from 'react';
import {Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ReactDom from 'react-dom';
import Popup from '../../components/Popup/Popup';
import {H} from 'react-headings';
import './Registration.css'

function RegForm(props) {

    const [postData, setPostData] = useState({ userName : '', userEmail : '', password : '' });
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const handleRegisterClick = () =>{
        setStatus(true);
        fetch('/auth/register', {
            method : 'POST', 
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(postData),
        }).then(response => response.json()).then(data => {
            console.log(data.message);
            setPostData({ userName: '', userEmail : '', password : ''});
            data.message == undefined ? setMessage("Registration Successful!") :  setMessage(data.message+"! Registration Unsuccessful, Please try again!");
            
        }).catch(error => {console.log('error', error);
        })
    }

    return (
        <div className = "divStyle">
            <H className = "title"> this.jobs </H>
            <H></H>
            <Form className="LoginForm" id="loginForm">
                <FormGroup controlId="formEmail" className = "FormComp w-50">
                    <FormControl placeholder="Enter your name" className = "inpBox" id="nameID" onChange={(e) => setPostData({...postData, userName : e.target.value}) }/>
                </FormGroup>
                <FormGroup className = "FormComp w-50">
                    <FormControl type="email" placeholder="Email Address" className = "inpBox" id="emailID" onChange={(e) => setPostData({...postData, userEmail : e.target.value}) }/>
                </FormGroup>
                <FormGroup controlId="formPassword" className = "FormComp w-50"  onChange = {(e) => setPostData({...postData, password : e.target.value})}>
                    <FormControl type="password" placeholder="Password" id="passwordID" className = "inpBox"/>
                </FormGroup>
                <FormGroup controlId="formSubmit" className = "FormComp">
                    <Button  className = "buttonStyle" id="submitID" onClick={handleRegisterClick}>
                        Register
                    </Button> 
                </FormGroup>
                <Popup trigger = {status} url = "/">
                    <h1>Alert!</h1>
                    <h3>{message}</h3>
                </Popup> 
            </Form>
            
        </div>
    )
}


export default RegForm;