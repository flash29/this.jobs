import React, { Component } from 'react';
import { useState} from 'react';
import {Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Route, useNavigate } from "react-router-dom";
import {H} from 'react-headings';
import TestRenderer from 'react-test-renderer';
import './LoginPage.css'



function LoginForm(props) {

    const [postData, setPostData] = useState({ useremail : '', password : ''});

    const handleLoginClick = () =>{
        console.log(postData);
        fetch('/auth/login', {
            method : 'POST',
            headers:{'Content-type':'application/json'},
            //headers:{'Authorization' : 'Bearer '}
            body:JSON.stringify(postData),
        }).then(response => response.json()).then(data => {
            console.log(data);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem(data.userEmail, data.password);
            sessionStorage.setItem('userid', data.userId);
            sessionStorage.setItem('token', data.token);
            console.log('stored token', sessionStorage.getItem('token') );
            console.log('userid stored', sessionStorage.getItem('userid')   );
            setPostData({ useremail : '', password : ''});
            //window.location.reload(false)
            let path = "/home";
            navigate(path);
        }).catch(error => console.log('error', error))
    }

    let navigate = useNavigate();
    const handleRegisterClick = () => {
        let path = "/registration";
        navigate(path);
    }

    return (
        <div className = "divStyle" data-testid={props["data-testid"]}>
            <H className = "title"> this.jobs</H>
            <Form className="LoginForm" id="loginForm">
                <FormGroup controlId="formEmail" className = "FormComp w-50">
                    <FormControl type="email" placeholder="Email Address" className = "inpBox" onChange={(e) => setPostData({...postData, useremail : e.target.value}) }/>
                </FormGroup>
                <FormGroup controlId="formPassword" className = "FormComp w-50" onChange = {(e) => setPostData({...postData, password : e.target.value})}>
                    <FormControl type="password" className = "FormComp" placeholder="Password" className = "inpBox"/>
                </FormGroup>
                <FormGroup data-testid = "formSubmit" controlId="formSubmit" className = "FormComp" >
                    <Button  className = "buttonStyle" data-testid = "login" onClick={handleLoginClick}>
                        Login
                    </Button>
                    <Button  className = "buttonStyle" data-testid = "reg" onClick={handleRegisterClick}>
                        Register
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}


export default LoginForm;
