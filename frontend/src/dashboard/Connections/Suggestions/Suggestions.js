import React from 'react';
import { useState, useEffect } from 'react';
import SComp from "./SComp";
import "./Suggestions.css";

function Suggestions(){
    const [posts, setPosts] = useState();
    let userid = sessionStorage.getItem('userid');

    async function getPosts () {
        console.log('/peopleyoumayknow/' + userid)
        fetch(('/peopleyoumayknow/' + userid), {
            //headers:{'Content-type':'application/json'},
            headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
            //body:JSON.stringify(postData),
        }).then(res => res.json())
            .then(res => {setPosts(res); })
            .catch(error => console.log('error getting Feed'))
        
            console.log(posts);
    }

    useEffect(() => {
        getPosts();
        console.log('posts', posts);
    }, []);

    return(
        <>{
            <div>
                <h1 className = "circleHead">People you may know!</h1>
                <div className = "mainDivConn"> 
                    <SComp props = {posts}/>
                </div>
            </div>
            
        }</>   
    )
}

export default Suggestions;