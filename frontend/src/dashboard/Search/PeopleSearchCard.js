

function PeopleSearchCard(props){
    return(
        <div className="jobCard">
            
            
            
            <div className='textDisplay' >
                
                <div className='searchJobTitle'>{props.username} </div>
                <div className='searchOrg'> {props.useremail} </div>
                <div className='searchlocation' > {props.bio} </div>

            </div>
        </div>
    );
}

export default PeopleSearchCard;