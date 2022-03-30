import SettingsItems from './SettingsItems';
import { Link} from "react-router-dom";
import './Settings.css';

function SettingsCard(){


    //update to use session storage variables and take the username
    let username = "ranjeet"
    let userid = sessionStorage.getItem('userid');

    return(
        <div className='settingsPageBoxInfo' >

            <Link to={`/settings/profile/${userid}`} className='linkDisplay' > 
                <div className='SettingsItemDisplayBox'>
                <div className='textInCard'>My Profile</div>
                </div>
            </Link>

            <Link to="/settings/changepassword" className='linkDisplay' > 
                <div className='SettingsItemDisplayBox'>
                <div className='textInCard'>Change Password</div>
                </div>
            </Link>
        </div>
    );
}

export default SettingsCard;