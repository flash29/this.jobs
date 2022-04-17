import React from 'react';
import { useState} from 'react';
import {Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {H} from 'react-headings';
import './LoginPage.css'
import Popup from '../../components/Popup/Popup';


function LoginForm(props) {

    const [postData, setPostData] = useState({ useremail : '', password : ''});
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const handleLoginClick = () =>{
        //console.log(postData);
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

            if(data.token == undefined){
                setMessage("Login Unsuccessful! Try Again!");
                setStatus(true);
                
            }
            else{
                // setMessage("Login Successful! Press Close to Enter!")
                let path = "/home";
                navigate(path);
            }
            // data.token == undefined ? (setMessage("Login Unsuccessful! Try Again!"); setStatus(false);) :  (setMessage("Login Successful! Press Close to Enter!");
            // setStatus(true);
            //window.location.reload(false)

            // let path = "/home";
            // navigate(path);
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
                    <FormControl type="password" className = "FormComp inpBox" placeholder="Password"/>
                </FormGroup>     
                <FormGroup controlId="formSubmit" data-testid = "formSubmit"  className = "FormComp">
                    <Button  className = "buttonStyle" data-testid = "login" onClick={handleLoginClick} id="loginButton" >
                        Login
                    </Button>
                    <Button  className = "buttonStyle" data-testid = "reg" onClick={handleRegisterClick} id="registrationButton" >
                        Register
                    </Button>
                </FormGroup>
            </Form>
            <Popup trigger = {status} url = "/home" msg = {message} setStatus = {setStatus}>
                    <h1>Alert!</h1>
                    <h3>{message}</h3>
            </Popup> 
        </div>
    )
}


export default LoginForm;
