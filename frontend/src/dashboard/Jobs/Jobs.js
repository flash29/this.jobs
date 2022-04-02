import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import './jobs.css'
import MyApps from './MyApps/MyApps'
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import JobSearch from './JobSearch/JobSearch';

import  { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import PostedJobs from './PostedJobs/PostedJobs';

let userid = sessionStorage.getItem('userid');
if(sessionStorage.getItem('tab') == undefined){
  sessionStorage.setItem('tab', 1);
}
// let params = useParams();

function DisplayProp(props) {
  const val = props.val;
  sessionStorage.setItem('tab', val);
  console.log(props.posts)
  if(val == 2){  
    return (<MyApps posts = {props.posts}/>);
  }
  else if(val == 3){
   return (<div><PostedJobs /></div>);
  //  return (<div>Hi</div>)
  }
  else{
    return (
      <JobSearch/>
     );
  }  
}

function Jobs(props) {
  
  const [value, setValue] = React.useState(Number(sessionStorage.getItem('tab')));
  const [posts, setPosts] = useState();

  async function getPosts () {
      console.log('/getappliedjobs/' + userid)
      fetch(('/getappliedjobs/' + userid), {
        //headers:{'Content-type':'application/json'},
        headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
        //body:JSON.stringify(postData),
    }).then(res => res.json())
        .then(res => setPosts(res) )
        .catch(error => console.log('error getting Feed'))
  }
  useEffect(() => {
    getPosts();
    console.log('posts', posts);
  }, []);
  
    return (
      <div className="App">
          <NavBar />
          <Paper square>
            <Tabs className = 'tabs' value={value} textColor = "primary" indicatorColor = "primary" onChange={(event, newValue) => {setValue(newValue); }}>
              <Tab label = "Jobs" value = {1}/>
              <Tab label = "My applications" value = {2}/>
              <Tab label = "Employer View" value = {3} />
            </Tabs> 
          </Paper>
          <div>
            <DisplayProp val = {value} posts = {posts}/>
          </div>
      </div>      
    );
  }
  export default Jobs;