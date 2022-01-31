//import logo from './logo.svg';
import "./SearchBar.css";
import sicon from "../../images/search-outline.svg";

function SearchBar(){
    return( 
        <div className = "searchBar">
            <input type = "text" placeholder = "Search"/>
            <img src = {sicon} className = "SearchIcon"/>
        </div>
    );
}

export default SearchBar;
