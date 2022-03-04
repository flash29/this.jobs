import React, { Component } from 'react';
import RegForm from './RegForm';
import './Registration.css';

class Registration extends Component{
    render() {
        return (
            <div className = "Registration">
                <RegForm/>
            </div>
        );
    }
}

export default Registration;