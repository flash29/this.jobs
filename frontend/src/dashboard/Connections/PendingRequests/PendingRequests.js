import React from 'react';
import { useState, useEffect } from 'react';
import PRs from "./PRs";

function PendingRequests(){
    const [posts, setPosts] = useState();
    let userid = sessionStorage.getItem('userid');

    async function getPosts () {
        console.log('/connectionrequests/' + userid)
        fetch(('/connectionrequests/' + userid), {
            //headers:{'Content-type':'application/json'},
            headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
            //body:JSON.stringify(postData),
        }).then(res => res.json())
            .then(res => {setPosts(res); })
            .catch(error => console.log('error getting Feed'))
    }

    useEffect(() => {
        getPosts();
        console.log('posts', posts);
    }, []);

    return(
        <>{
            <div>
                <h1>Some people can't wait to connect with you!</h1>
                <div className = "mainDivConn">
                    <PRs props = {posts}></PRs>
                </div>
            </div>
            
        }</>   
    )
}

export default PendingRequests;