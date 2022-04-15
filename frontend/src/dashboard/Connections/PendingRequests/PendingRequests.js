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
            <PRs props = {posts}></PRs>
        }</>   
    )
}

export default PendingRequests;