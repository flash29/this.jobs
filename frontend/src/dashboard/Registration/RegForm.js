import React, { Component } from 'react';
import { useState} from 'react';
import {Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {H} from 'react-headings';
import './Registration.css'



function RegForm(props) {

    const [postData, setPostData] = useState({ userName : '', userEmail : '', password : '' });
    let navigate = useNavigate();

    const handleRegisterClick = () =>{
        console.log(postData);
        fetch('/auth/register', {
            method : 'POST', 
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(postData),
        }).then(response => response.json()).then(data => {
            console.log(data);
            setPostData({ userName: '', userEmail : '', password : ''});
            //window.location.reload(false)
            let path = "/";
            navigate(path);
        }).catch(error => console.log('error', error))
    }

    
    const handleLoginClick = () => {
        let path = "/";
        navigate(path);
    }

    return (
        <div className = "divStyle">
            <H className = "title"> this.jobs</H>
            <Form className="LoginForm" id="loginForm">
                <FormGroup controlId="formEmail" className = "FormComp w-50">
                    <FormControl placeholder="Enter your name" className = "inpBox" onChange={(e) => setPostData({...postData, userName : e.target.value}) }/>
                </FormGroup>
                <FormGroup className = "FormComp w-50">
                    <FormControl type="email" placeholder="Email Address" className = "inpBox" onChange={(e) => setPostData({...postData, userEmail : e.target.value}) }/>
                </FormGroup>
                <FormGroup controlId="formPassword" className = "FormComp w-50" onChange = {(e) => setPostData({...postData, password : e.target.value})}>
                    <FormControl type="password" className = "FormComp" placeholder="Password" className = "inpBox"/>
                </FormGroup>
                <FormGroup controlId="formSubmit" className = "FormComp">
                    <Button  className = "buttonStyle"  onClick={handleRegisterClick}>
                        Register
                    </Button>
                    {/* <Button  className = "buttonStyle"  onClick={handleLoginClick}>
                        Login
                    </Button> */}
                </FormGroup>
            </Form>
        </div>
    )
}


export default RegForm;