import './JobDescriptionCard.css'
import {useState} from 'react';
function JobDescriptionCard(props){

    const token = sessionStorage.getItem('token');
    let userid = sessionStorage.getItem('userid');

  //  const [applied, setApplied] = useState(false);

    function createDate(createdAt){
        let timeOfPost = '';
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - createdAt)/(60*60*24) ;
        if(differenceDate<1){
            // console.log('check proper time here', differenceDate*24 );
            differenceDate = differenceDate *48;
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + 'H';
        }
        else{
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + 'D';
        }
        return timeOfPost;
    }

    const applyClicked = () => {
        console.log('apply clicked');

        fetch('/applyjob', {
            method : 'POST',
            headers:{
              'Content-type':'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              "userId": Number(userid),
              "jobId": props.jobsid,
            }) 
            }).then(response => response.json())
              .then(data => {
                  
         //         setApplied(true);
                props.updateApplied(props.index)
                  
                  console.log('here is the data for applying the job', data);
                  
              }).catch(error => console.log('error', error))
    }

    return(

        <div>
            
            <div className='descOrg'> {props.organisation} </div>
            <div className='descJob' > {props.job} </div>
            <div className='locAndTime'> 
                <div className='descLoc'> {props.location} </div>
                <div className='descTime'> { createDate(props.timeposted) } </div>
            </div>
            <div className='salary'> Salary: {props.salary} </div>

            <div className='applyJobButton' onClick={applyClicked}> Apply </div>
            {
                
                props.applied
                ?
                <div>
                    You have applied for this job.
                </div>
                :
                <></>
            }
            <div className='descriptionJob'>
                <div className='descriptionTag'>
                  Description
                </div>
                <div className='descContent'>
                    <p>
                        {props.description}
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default JobDescriptionCard;