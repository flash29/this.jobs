import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar'

function NavBar() {
  return (
    <div>
     <div className="NavBar">
       <div className="title">
          this.jobs
       </div>
       <div className="SearchBar">
          <SearchBar />
       </div>
       <div className="iconsHolder">
          Icons will be placed here
       </div>
      
     </div>
    </div>
  );
}

export default NavBar;