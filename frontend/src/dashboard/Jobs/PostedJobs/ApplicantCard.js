import './ApplicantCard.css';
import { useNavigate } from "react-router-dom";

function ApplicantCard(props){
    let navigate = useNavigate();

    const clickHandler = () => {
        let path = "/settings/profile/"+props.userId;
        navigate(path);
    }

    return (
        <div className='listCardJobs2' onClick={clickHandler}>
            <div className='jobTitleList2'> {props.userName} </div>
        </div>
    );
}

export default ApplicantCard;