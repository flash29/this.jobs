import NavBar from '../../../components/NavBar/NavBar'
import '../Settings.css';
import SettingsCard from '../SettingsCard';

function Settings() {


    return (
      <div className="App">
          <NavBar />
          <div className='settingsLayout'>
              
              <SettingsCard />
          
              <div className='contentBoxSettings'>

               This is where the user will change his password

              </div>
          </div>
          
          

      </div>
    );
  }
  
  export default Settings;