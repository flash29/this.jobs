import React, { useState, useEffect } from 'react';
import ServerLost from '../../../ErrorPage/ServerLost'
import FeedEmpty from '../../../ErrorPage/FeedEmpty'
import AppCard from './AppCard';


function MyApps(props) {
    console.log('props', props);
    return (
        <>
        {
            props.apps === undefined ?
                <ServerLost />
                :
                <>
                {
                    props.apps.length === 0 ?
                    <FeedEmpty />
                    :
                    <>
                    {
                        props.apps.map((app, i)=>{
                            console.log('anslist', app);
                            return (
                                <AppCard 
                                    key ={i}
                                    AppContent = {app}
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
}

export default MyApps;