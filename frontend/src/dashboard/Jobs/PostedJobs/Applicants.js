import './Applicants.css';
import './ApplicantCard';
import {useState} from 'react';
import ApplicantCard from './ApplicantCard';

function Applicants(props){
    // console.log(props.posts);

    return(
        <div>
             <div className='descOrg1'> {props.posts.org} </div>
             <div className='descJob1' > {props.posts.jobtitle} </div>
             <div className='locAndTime1'> 
                 <div className='descLoc1'> Location : {props.posts.location} </div>
             </div>
             <div className='salary1'> Salary: {props.posts.salary} </div>

             <div className='descriptionJob1'>
                 <div className='descriptionTag1'>
                 Applicants:
                 </div>
                 <div className='descContent1' >
                     {
                         props === undefined || props.posts.appliedUsersList === undefined?
                         <>Undefined Props!</>
                         :
                         <>{
                            props.posts.appliedUsersList.length === 0 ?
                            <>No Applicants for this Job yet!</>
                            :
                            props.posts.appliedUsersList.map((names) => <ApplicantCard userId = {names.userId} userName = {names.userName}/>
                            // <h2>{names.userId}</h2>
                            )
                            // <h2>{props.posts.appliedUsersList}</h2>
                         }</>
                         
                     }
                 </div>
             </div>
         </div>    
    );
}

export default Applicants;