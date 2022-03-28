import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import './jobs.css'
import MyApps from './MyApps/MyApps'
import PostedJobs from './PostedJobs/PostedJobs'
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

function DisplayProp(props) {
  const val = props.val;
  if(val == 2){
    return (<MyApps />);
  }
  else if(val == 3){
    return (<PostedJobs />);
  }
  else{
    return (<div>Jobs!</div>);
  }  
}

function Jobs() {
  const [value, setValue] = React.useState(1);
    return (
      <div className="App">
          <NavBar />
          <Paper square>
            <Tabs className = 'tabs' value={value} textColor = "primary" indicatorColor = "primary" onChange={(event, newValue) => {setValue(newValue); }}>
              <Tab label = "Jobs" value = {1}/>
              <Tab label = "My applications" value = {2}/>
              <Tab label = "Posted Jobs" value = {3} />
            </Tabs> 
          </Paper>
          <div>
            <DisplayProp val = {value}/>
          </div>
      </div>      
    );
  }
  
  export default Jobs;