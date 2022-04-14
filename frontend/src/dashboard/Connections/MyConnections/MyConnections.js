import React from 'react';
import ServerLost from '../../../ErrorPage/ServerLost'
import ConnCard from "./ConnCard"

function MyConnections(props){
    console.log('props', props);

    return(
        <>{
            props.posts === undefined ?
            <ServerLost className = "serverLost"/>
            :
            <>
            {
                props.posts.map((post, i) => {
                  console.log("connections", post);
                  return(
                      <ConnCard key = {i} postContent = {post} className = "connCard"/>
                  )  
                })
            }
            </>
        }</>
    )
}

export default MyConnections;