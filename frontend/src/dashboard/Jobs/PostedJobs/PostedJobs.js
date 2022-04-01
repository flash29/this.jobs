import PJCard from './PJCard'
import PostJob from './PostJob'
import "./PostedJobs.css";
import React, { useState, useEffect } from 'react';
import PJBoxComp from './PJBoxComp';

function PostedJobs(props){

    const [posts, setPosts] = useState();
    let userid = sessionStorage.getItem('userid');

    async function getJobsPosted () {
            console.log('/getjobposts/'+userid)
            fetch(('/getjobposts/'+userid), {
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
            <div className="grid-container-element">
                <div className="grid-child-element purple">
                    <PJBoxComp posts = {posts}/>
                </div>
                {/* <div className="grid-child-element green">
                    Applicants list will appear here
                </div> */}
            </div>
        </div>  
    );
}

export default PostedJobs;