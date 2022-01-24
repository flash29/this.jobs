//import logo from './logo.svg';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(){
    return( 
        <div className = "searchBar">
            <input type = "text" placeholder = "Search"/>
            <div className = "SearchIcon"><SearchIcon/></div>
        </div>
    );
}

export default SearchBar;
