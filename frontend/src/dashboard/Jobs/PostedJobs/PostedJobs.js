import PJCard from './PJCard'
import PostJob from './PostJob'
import React, { useState, useEffect } from 'react';



function PostedJobs(){

    const [posts, setPosts] = useState();
        async function getPosts () {
            fetch('/jobposts', {
                //headers:{'Content-type':'application/json'},
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                //body:JSON.stringify(postData),
            }).then(res => res.json())
                .then(res => setPosts(res) )
                .catch(error => console.log('error getting Feed'))
        }
        useEffect(() => {
            getPosts();
            console.log('posts', posts);
    }, []);

    return(
        <div>
            <PostJob/>
            <PJCard/>
        </div>  
    );
}

export default PostedJobs;