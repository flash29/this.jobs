import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MyConnections from "../Connections/MyConnections/MyConnections"
import PendingRequests from './PendingRequests/PendingRequests';
import Suggestions from "./Suggestions/Suggestions";
import { useState, useEffect } from 'react';
import './Connections.css';


if(sessionStorage.getItem('tab2') === undefined){
  sessionStorage.setItem('tab2', 1);
}


function DisplayProp(props) {
  const val = props.val;
  sessionStorage.setItem('tab2', val);
  console.log(props.posts)
  if(val === 2){  
    return (<PendingRequests/>);
  }
  else if(val === 3){
   return (<Suggestions/>);
  }
  else{
    console.log(props.posts);
    return (
        <div >
          <h1 className='circleHead'>Your Circle!</h1>
          <div className="mainDivConn">
            <MyConnections posts = {props.posts}/>
          </div>
        </div>
     );
  }  
}

function Connections() {

   const [value, setValue] = React.useState(Number(sessionStorage.getItem('tab2')));
   const [posts, setPosts] = useState();
   let userid = sessionStorage.getItem('userid');

  async function getPosts () {
      console.log('/followers/' + userid)
      fetch(('/followers/' + userid), {
        //headers:{'Content-type':'application/json'},
        headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
        //body:JSON.stringify(postData),
    }).then(res => res.json())
        .then(res => {setPosts(res); })
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
              <Tab label = "My Connections" value = {1}/>
              <Tab label = "Pending Requests" value = {2}/>
              <Tab label = "Suggestions" value = {3} />
            </Tabs> 
          </Paper>
          <div>
            <DisplayProp val = {value} posts = {posts}/>
          </div>
      </div>
    );
  }
  
  export default Connections;