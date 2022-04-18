import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar'
import { Link} from "react-router-dom";
import work from '../../images/work_white_1.png'
import house from '../../images/house_white_1.png'
import logout from '../../images/logout_white_1.png'
import people from '../../images/people_white_1.png'
import settings from '../../images/settings_white_1.png'
import { useNavigate } from "react-router-dom";


function NavBar() {

  let navigate = useNavigate();

  const handleLogout = () =>{
    console.log("Pressed Logout!");
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');
    // console.log(sessionStorage.getItem('userid'));
    // console.log(sessionStorage.getItem('token'));
  }

  const clickHandler = () => {
    let path = "/home";
    navigate(path);
}

  return (
    <div>
     <div className="NavBar">
       <div className="title" onClick = {clickHandler}>
          this.jobs
       </div>
       <div className="SearchBar">
          <SearchBar />
       </div>
       <div className="iconsHolder">

          <Link to="/home" className='linkDisplay home ' > 
            <div className='iconsDisplay'>
              <img className='iconsImages ' src={house} alt="Home"/>
              <p className='iconLabel '>Home</p>
            </div>
          </Link>
          <Link to="/connections" className='linkDisplay connections ' > 
            <div className='iconsDisplay'>
              <img className='iconsImages' src={people} alt="Home"/>
              <p className='iconLabel'>Connections</p>
            </div>
          </Link>
          <Link to="/jobs" className='linkDisplay jobs' > 
            <div className='iconsDisplay'>
              <img className='iconsImages' src={work} alt="Home"/>
              <p className='iconLabel'>Jobs</p>
            </div>
          </Link>
          <Link to= {`/settings/profile/${sessionStorage.getItem('userid')}`} className='linkDisplay settings'> 
            <div className='iconsDisplay'>
              <img className='iconsImages' src={settings} alt="Home"/>
              <p className='iconLabel'>Settings</p>
            </div>
          </Link>
          <Link className='linkDisplay logout' onClick={handleLogout} to="/"> 
            <div className='iconsDisplay'>
              <img className='iconsImages' src={logout} alt="Home"/>
              <p className='iconLabel'>Logout</p>
            </div>
          </Link>
       </div>
      
     </div>
    </div>
  );
}

export default NavBar;