//import logo from './logo.svg';
import "./SearchBar.css";
import sicon from "../../images/search-outline.svg";
import {Link} from "react-router-dom";

function SearchBar(){
    return( 
        <div className = "searchBar">
            <input type = "text" placeholder = "Search"/>
            <Link to = "/search">
                <img src = {sicon} className = "SearchIcon"/>
            </Link>
        </div>
    );
}

export default SearchBar;
