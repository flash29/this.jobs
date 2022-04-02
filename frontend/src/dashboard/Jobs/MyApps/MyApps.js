import React, { useState, useEffect } from 'react';
import ServerLost from '../../../ErrorPage/ServerLost'
import FeedEmpty from '../../../ErrorPage/FeedEmpty'
import AppCard from './AppCard';


function MyApps(props) {
    console.log('props', props);

    return (
        <>
        {
            props.posts === undefined ?
                <ServerLost className = "serverLost"/>
                :
                <>
                {
                    props.posts.length === 0 ?
                    <FeedEmpty className = "feedEmpty"/>
                    :
                    <>
                    {
                        props.posts.map((post, i)=>{
                            console.log('anslist', post);
                            return (
                                <AppCard 
                                    key ={i}
                                    postContent = {post}
                                    className = "appCard"
                                />
                            );
                        })
                    }
                    </>
                }
                </>
        }
        </>
    );

    // return(
    //     <AppCard />
    // );
}

export default MyApps;