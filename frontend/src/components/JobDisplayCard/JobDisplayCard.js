import './JobDisplayCard.css';

function JobDisplayCard(props){

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

    const clickHandler = () => {
        props.descSet(props.index);
    }

    return (
        <div className='listCardJobs' onClick={clickHandler}>

        <div className='jobTitleList'> {props.jobs} </div>
        <div className='jobOrgList'> {props.organisation} </div>
        <div className='jobLocList'> {props.location} </div>
        <div className='jobTimeList'> { createDate( props.timeposted ) } </div>
    </div>
    );
}

export default JobDisplayCard;