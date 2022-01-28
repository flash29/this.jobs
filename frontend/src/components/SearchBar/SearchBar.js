//import logo from './logo.svg';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import sicon from "../../images/search-outline.svg";

function SearchBar(){
    return( 
        <div className = "searchBar">
            <input type = "text" placeholder = "Search"/>
            <img src = {sicon} class = "SearchIcon"/>
        </div>
    );
}

export default SearchBar;
