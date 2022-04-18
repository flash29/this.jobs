//import logo from './logo.svg';
import "./SearchBar.css";
import {useState} from 'react';
import {
    useNavigate,
    createSearchParams,
  } from 'react-router-dom';

function SearchBar(){
    const navigate = useNavigate();

    const[searchCheck, setSearchCheck] = useState('');



    const handleChange = (e) =>{
        setSearchCheck(e.target.value)
        // console.log('value is ', e.target.value)
    }

    const handleSearch = () => {
        console.log('the search value is ', searchCheck);
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({ query: searchCheck })}`,
          });
    }

    const handleEnter = (e) => {
        // console.log('hi', e)
        let code = e.keyCode || e.which;
        if ( code === 13 ) {
            // console.log('Enter pressed')
            handleSearch();
          }
    }


    return( 
        <div className = "searchBarDisplay">
            <input 
            type = "text" 
            placeholder = "Search" 
            className="searchInput" 
            value= {searchCheck}
            onChange={handleChange}
            onKeyPress = {handleEnter}
            id = "searchInput"
            />
        </div>
    );
}

export default SearchBar;
