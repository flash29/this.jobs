import React from 'react';
import ServerLost from '../../../ErrorPage/ServerLost'
import ConnCard from "./ConnCard"
import Scroll from '../../../components/Scroll';

function MyConnections(props){
    console.log('props', props);

    return(
        <>{
            props.posts === undefined ?
            <ServerLost className = "serverLost"/>
            :
            <>
            {   
                props.posts === null ?
                <>No Connections! Let's make new ones now!</>
                :
                props.posts.map((post, i) => {
                  console.log("connections", post);
                  return(
                    <div >
                        <ConnCard key = {i} postContent = {post} className = "connCard"/>
                    </div> 
                  )  
                })
            }
            </>
        }</>
    )
}

export default MyConnections;