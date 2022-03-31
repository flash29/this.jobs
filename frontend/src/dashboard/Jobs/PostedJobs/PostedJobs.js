import PJCard from './PJCard'
import PostJob from './PostJob'
// import ApDisplay from './ApDisplay'
import "./PostedJobs.css";
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';



function PostedJobs(){

    const [posts, setPosts] = useState();

    async function getJobsPosted () {
            fetch('/jobposts', {
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
            }).then(res => res.json())
                .then(res => setPosts(res) )
                .catch(error => console.log('error getting Feed'))
        }
        useEffect(() => {
            getJobsPosted();
            console.log('posts', posts);
    }, []);

    return(
        <div>
            <PostJob/>
            <div class="grid-container-element">
                <div class="grid-child-element purple">
                    <PJCard posts = {posts}/>
                </div>
                <div class="grid-child-element green">
                    Applicants list will appear here
                </div>
            </div>
        </div>  
    );
}

export default PostedJobs;