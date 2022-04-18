import NavBar from '../../components/NavBar/NavBar'
import { useSearchParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './Search.css'
import PeopleSearchCard from './PeopleSearchCard';
import JobsSearchCard from './JobsSearchCard';

function Search() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')

  const [selected, setSelected] = useState('peopleID')


  const [peopleData, setPeopleData] = useState([])
  const [jobsData, setJobsData] = useState([])

  

  async function getPeopleData () {

    fetch(`/search/people?search=${query}`, {
        headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
  
    })
    .then(resp => resp.json())
    .then(resp => setPeopleData(resp) )
    .catch(err => console.log('error at', err))
  }

  async function getJobsData () {

    fetch(`/search/jobs?search=${query}`, {
        headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
  
    })
    .then(resp => resp.json())
    .then(resp => setJobsData(resp) )
    .catch(err => console.log('error at', err))
  }

  function handleOptions(e){

    if(e.target.id === "peopleID"){
      console.log('the people id is clicked')
      setSelected('peopleID')
    }
    else{
      console.log('the jobs id is clicked')
      getJobsData();
      setSelected('JobsID')
    }


  }

  useEffect(()=>{
    getPeopleData();
    
  }, []);


    return (
      <div className="App">
          <NavBar className = "NaviBar"/>
          <div className='optionSearch' >
              <div className={ selected === 'peopleID' ? 'optionSelected' : 'option' } id="peopleID" onClick={handleOptions} >People</div>
              <div className={ selected === 'JobsID' ? 'optionSelected' : 'option' }  id = "JobsID" onClick={handleOptions}  >Jobs</div>
          </div>
          {
            selected === 'peopleID'
            ?
            <>

              <div className='cardDisplay' >
                  {
                    peopleData.map((pd, i)=>{
                      return(
                        <PeopleSearchCard 
                        username = {pd.username}
                        useremail = {pd.useremail}
                        bio = {pd.bio}
                        key = {i}
                        />
                      );
                    })
                  }
              </div>
            </>
            :
            <>
              <div className='cardDisplay' >
              {
                    jobsData.map((jd, i)=>{
                      return(
                        <JobsSearchCard 
                        jobTitle = {jd.jobtitle}
                        location = {jd.location}
                        org = {jd.org}
                        jobId = {jd.jobId}
                        key = {jd.jobId}
                        />
                      );
                    })
                  }
              </div>
            </>
          }
      </div>
    );
  }
  
  export default Search;