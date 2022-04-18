import './JobsSearchCard.css'

function JobsSearchCard(props){
    return(
        <div className="jobCard">
            <div className='textDisplay' >
                
                <div className='searchJobTitle'> {props.jobTitle} </div>
                <div className='searchOrg'> {props.org} </div>
                <div className='searchlocation' > {props.location} </div>

            </div>
            
            
            
            {/* <div className='applyOption'> Apply  </div> */}
            
        </div>
    );
}

export default JobsSearchCard;