import PJCard from './PJCard'
import PostJob from './PostJob'
import "./PostedJobs.css";
import React, { useState, useEffect } from 'react';
import PJBoxComp from './PJBoxComp';
import Scroll from '../../../components/Scroll';
import Applicants from './Applicants';

function PostedJobs(){

    const [posts, setPosts] = useState([]);
    let userid = sessionStorage.getItem('userid');

    const [loading, setLoading] = useState(false);
    const [descKey, setKeyDesc] = useState(0);

    async function getJobsPosted () {
            console.log('/getjobposts/'+userid)
            fetch(('/getjobposts/'+userid), {
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
            }).then(res => res.json())
                .then(res => {
                    
                    console.log('here is the data for applicants', res);
                    setPosts(res);
                    if(res.length>0){
                      setLoading(true);
                    }
                 }).catch(error => console.log('error getting Feed'))
    }

    useEffect(() => {
        getJobsPosted();
        console.log('posts', posts);
    }, []);

    console.log(descKey);
    return(
        <div>
            <PostJob className = "job-posting"/>
            <div className="grid-container-element">
                <div className='grid-child-element purple'>
                    <Scroll height="80vh" width="25vw" >
                    {
                        posts.map((post, i) => {
                            console.log('anslist', post);
                            return (
                                <div className = "grid-container-element2">
                                    <PJCard 
                                        key ={i}
                                        postContent = {post}
                                        className = "grid-child-element purple"
                                        descSet = {setKeyDesc}
                                        index = {i}
                                    />
                                </div>
                            );
                          })
                    }           
                    </Scroll>
                </div>
                <div className = 'applsDisplay'>
                    <Scroll height="80vh" width="50vw">
                        {
                            loading ? 
                            <Applicants posts = {posts[descKey]} index = {descKey} /> 
                            : 
                            <>Applicants!</>
                        }
                    </Scroll>
                </div>

            </div>
        </div>  
    );
}

export default PostedJobs;