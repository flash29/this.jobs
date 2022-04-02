import './JobSearch.css'

import Scroll from '../../../components/Scroll';

import {useEffect, useState} from 'react';

import JobDisplayCard from '../../../components/JobDisplayCard/JobDisplayCard';

import JobDescriptionCard from '../../../components/JobDescriptionCard/JobDescriptionCard';

function JobSearch(){

    
   const token = sessionStorage.getItem('token');

   const [listjobs, setListJobs] = useState([]);

   const [descKey, setKeyDesc] = useState(0);

   const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetch('/getalljobposts', {
            method : 'GET',
            headers:{
              'Content-type':'application/json',
              'Authorization': 'Bearer ' + token
            }, 
            }).then(response => response.json())
              .then(data => {
                    data.forEach((d)=> d.applied = false );
                  console.log('here is the data for userProfile', data);
                  setListJobs(data);
                  if(data.length>0){
                    setLoading(true);
                  }
                  
              }).catch(error => console.log('error', error))
    }, []);

    const updateApplied = (index) =>{
        listjobs[index].applied = !listjobs[index].applied
        setListJobs(listjobs);
    }
    return (
        <div>
           <div className='JobsListAndDesc'>
               <div className='JobsList'>
                    <Scroll height="80vh" width="30vw" >
                        {
                            listjobs.map((job, i) => {
                                return (
                                    <JobDisplayCard 
                                    key ={i}
                                    jobs = {job.jobtitle}
                                    organisation = { job.org }
                                    location = { job.location }
                                    timeposted = { job.createdAt }
                                    descSet = {setKeyDesc}
                                    index = {i}
                                    />
                                );
                              })
                        }


                    </Scroll>
               </div>
               <div className='JobsDesc'>
               <Scroll height="80vh" width="50vw" >
                   {
                       loading
                       ?
                       <JobDescriptionCard
                        job = {listjobs[descKey].jobtitle}
                        organisation = { listjobs[descKey].org }
                        location = { listjobs[descKey].location }
                        timeposted = { listjobs[descKey].createdAt }
                        description = { listjobs[descKey].content }
                        salary = { listjobs[descKey].salary }
                        jobsid = {listjobs[descKey].jobId}
                        applied ={listjobs[descKey].applied}
                        updateApplied = {updateApplied}
                        index = {descKey}
                        /> 
                        :
                        <>Loading</>
                   }
                    </Scroll>

               </div>

           </div>
        </div>
    );
}

export default JobSearch;