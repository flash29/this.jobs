import NavBar from '../../../components/NavBar/NavBar'
import '../Settings.css';
import  { useParams } from "react-router-dom";
import SettingsCard from '../SettingsCard';

function Settings() {

    let params = useParams();

    return (
      <div className="App">
          <NavBar />
          <div className='settingsLayout'>
              
              <SettingsCard />
          
              <div className='contentBoxSettings'>

                <div className='displayPicture'>
                    <img src='' alt='user DP' />
                </div>
                this is {params.userid} 
              </div>
          </div>
          
          

      </div>
    );
  }
  
  export default Settings;