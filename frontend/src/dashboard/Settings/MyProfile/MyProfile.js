import NavBar from '../../../components/NavBar/NavBar'
import '../Settings.css';
import  { useParams } from "react-router-dom";
import SettingsCard from '../SettingsCard';
import { useState, useEffect } from 'react';
import dp from './dp1.jpg';
import React from 'react';

function Settings() {

  //  let params = useParams();

    const [userData, setUserData] = useState({
      imageData : dp,
      userName : '',
      userBio: '',
      projects: [],
      experience: [],
      education: [],
      resume: '',
      test: ''
    });

    const [updateEducationTracker , setUpdateEducationTracker] = useState(null);
    const [updateExperienceTracker , setUpdateExperienceTracker] = useState(null);
    const [updateProjectTracker , setUpdateProjectTracker] = useState(null);


    let token = sessionStorage.getItem('token');
    let userid = sessionStorage.getItem('userid');

    const [changedTracker, setChangedTracker] = useState(false);

    const [updateEducation, setUpdateEducation] = useState();

    const [bioTracker, setBioTracker] = useState(false);

    const [clickedAddEducation, setClickedAddEducation] = useState(false);

    const [newEducationName, setNewEducationName] = useState('');
    const [newEducationDates, setNewEducationDates ] = useState('');
    const [newEducationDescription, setNewEducationDescription ] = useState('');


    const [changedTrackerExperience, setChangedTrackerExperience ] = useState(false);
    const [updateExperience, setUpdateExperience ] = useState();
    const [clickedAddExperience, setClickedAddExperience ] = useState(false);
    const [newExperienceName, setNewExperienceName] = useState('');
    const [newExperienceDates, setNewExperienceDates ] = useState('');
    const [newExperienceDescription, setNewExperienceDescription ] = useState('');

    const [changedTrackerProjects , setChangedTrackerProjects ] = useState(false);
    const [updateProjects, setUpdateProjects ] = useState();
    const [clickedAddProjects, setClickedAddProjects ] = useState(false);
    const [newProjectsName, setNewProjectsName] = useState('');
    const [newProjectsDescription, setNewProjectsDescription ] = useState('');



    // setUserData();
    useEffect(()=>{


      fetch('/userprofile/1', {
        method : 'GET',
        headers:{
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + token
        }, 
        }).then(response => response.json())
          .then(data => {
              console.log('here is the data for userProfile', data);
              setUserData({...userData, 
                education : data.education,
                userBio : data.bio,
                experience: data.jobhistory,
                projects: data.projects,
                imageData: data.picture

                });
          }).catch(error => console.log('error', error))

      
    //   setUserData({...userData, education: [
    //     {
    //       'name': 'University Of Florida',
    //       'dates': 'Aug 2021 - May 2023',
    //       'description': 'GPA : 3.89/ 4'
    //     },
    //     {
    //       'name': 'JNTUH',
    //       'dates': 'Aug 2016 - May 2021',
    //       'description': 'GPA : 7.89/ 10'
    //     }
    //   ], 
    //   userBio: 'Actively Looking for Summer Internships || Ex-Quantium ' ,
    //   experience: [
    //     {
    //       'name': 'Quantium',
    //       'dates': 'Jan 2020 - July 2020',
    //       'description': 'Data Analyst - Intern'
    //     }, 
    //     {
    //       'name': 'Meta',
    //       'dates': 'May 2023 - Present',
    //       'description': 'Software Engineer'
    //     }
    //   ],
    //   projects: [
    //     {
    //       'name': 'Twitter Clone',
    //       'description': 'Made Twitter using AKKA'
    //     }, 
    //     {
    //       'name': 'Reddit',
    //       'description': 'Made Reddit frontend in react'
    //     }
    //   ]
    
    // }
      
    //   )

      setUpdateEducation(userData.education);
      setUpdateExperience(userData.experience);
      setUpdateProjects(userData.projects);

    }, []);

    const clickUpdateEducation = () => {
      setUserData({...userData, education: updateEducation });

      fetch('/updateducation', {
        method : 'PUT',
        headers:{
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "educationId" : userData.education[updateEducationTracker-1].educationId,
          "insName": userData.education[updateEducationTracker-1].insName ,
          "timeline": userData.education[updateEducationTracker-1].timeline,
          "gpa" : userData.education[updateEducationTracker-1].gpa,
          "userId" : Number(userid)
        }) 
        }).then(response => response.json())
          .then(data => {
              console.log('here is the data for updating education', data);
          }).catch(error => console.log('error', error))



      console.log('userDataEducation', userData.education);
      setChangedTracker(false);
      /********************/
      // Add update option here for education
    }

    const addEducation = () => {
      console.log('clicked on add');
      setClickedAddEducation(true);
    }


    const upDateEduJson= (tar, i, e) => {
      
      let education = userData.education;

      
        console.log('here i is', i);
        console.log('target is', e.currentTarget.textContent);
        console.log( userData.education[i][tar] );

        setUpdateEducationTracker(userData.education[i]['educationId']);


        console.log('education', education);
        education[i][tar] = e.currentTarget.textContent;
        console.log('updated education', education);
        setChangedTracker(true);
        setUpdateEducation(education);
        console.log('tracker', updateEducationTracker);

    }



    const changeEducationName = (e) => {
      setNewEducationName(e.target.value);
      console.log('name', newEducationName);
    }

    const changeEducationDates = (e) => {
      setNewEducationDates(e.target.value);
      console.log('dates', newEducationDates );
    }

    const changeEducationDescription = (e) => {
      setNewEducationDescription(e.target.value);
      console.log('description', newEducationDescription );
      
    }

    
    const addUpdateEducation= () => {
        let newData = {};
        let educationData = userData.education;
        newData['insName'] = newEducationName;
        newData['timeline'] = newEducationDates;
        newData['gpa'] = newEducationDescription;
        educationData.push(newData);
        setUserData({...userData, education:  educationData });



        fetch('/addeducation', {
          method : 'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            "userId": Number(userid),
            "insName": newEducationName,
            "timeline": newEducationDates,
            "gpa" : newEducationDescription,
          }) 
          }).then(response => response.json())
            .then(data => {
                console.log('here is the data for updating bio', data);
            }).catch(error => console.log('error', error))



        setClickedAddEducation(false);
        console.log('new education');

    }

    const changeExperiencenName = (e) => {
      setNewExperienceName(e.target.value);
      console.log('name', newExperienceName);
    }

    const changeExperienceDates = (e) => {
      setNewExperienceDates(e.target.value);
      console.log('dates', newExperienceDates );
    }

    const changeExperienceDescription = (e) => {
      setNewExperienceDescription(e.target.value);
      console.log('description', newExperienceDescription );
    }
    const addExperience = () => {
      console.log('clicked on add');
      setClickedAddExperience(true);
    }
    const addUpdateExperience = () => {
        let newData = {};
        let educationData = userData.experience;
        newData['company'] = newExperienceName;
        newData['timeline'] = newExperienceDates;
        newData['position'] = newExperienceDescription;
        educationData.push(newData);
        setUserData({...userData, experience:  educationData });
        setClickedAddExperience(false);
        console.log('new work experience');

        fetch('/addjob', {
          method : 'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            "userId": Number(userid),
            "company": newExperienceName,
            "timeline": newExperienceDates,
            "position" : newExperienceDescription,
          }) 
          }).then(response => response.json())
            .then(data => {
                console.log('here is the data for updating experience', data);
            }).catch(error => console.log('error', error))

    }
    const upDateExperienceJson= (tar, i, e) => {
      
      let education = userData.experience;
        // console.log('here i is', i);
        // console.log('target is', e.currentTarget.textContent);
        // console.log(userData.experience[i][tar]);
        // console.log('education', education);
        education[i][tar] = e.currentTarget.textContent;
        // console.log('updated education', education);
        setChangedTrackerExperience(true);
      //  setChangedTracker(true);
        setUpdateExperience(education);

        setUpdateExperienceTracker(userData.experience[i]['jobHistoryId']);
        console.log('exp tracker', updateExperienceTracker);
        // setUserData({...userData, education: education });

        // console.log('userDataEducation', userData.education);

    }

    const clickUpdateExperience = () => {
      setUserData({...userData, experience: updateExperience });
      console.log('userDataEducation', userData.experience);
      setChangedTrackerExperience(false);


      fetch('/updatejob', {
        method : 'PUT',
        headers:{
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "jobHistoryId" : userData.experience[updateExperienceTracker-1].jobHistoryId,
          "company": userData.experience[updateExperienceTracker-1].company ,
          "timeline": userData.experience[updateExperienceTracker-1].timeline,
          "position" : userData.experience[updateExperienceTracker-1].position,
          "userId" : Number(userid)
        }) 
        }).then(response => response.json())
          .then(data => {
              console.log('here is the data for updating expereince', data);
          }).catch(error => console.log('error', error))

      /********************/
      // Add update option here for education
    }

    const changeProjectName = (e) => {
      setNewProjectsName(e.target.value);
      console.log('name', newProjectsName);
    }

    const changeProjectDescription = (e) => {
      setNewProjectsDescription(e.target.value);
      console.log('description', newProjectsDescription );
    }

    const addProject = () => {
      console.log('clicked on add');
      setClickedAddProjects(true);
    }

    const addUpdateProject = () => {
        let newData = {};
        let educationData = userData.projects;
        newData['projName'] = newProjectsName;
        newData['description'] = newProjectsDescription;
        educationData.push(newData);
        setUserData({...userData, projects:  educationData });
        setClickedAddProjects(false);
        console.log('new work experience');

        fetch('/addproject', {
          method : 'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            "userId": Number(userid),
            "projName": newProjectsName,
            "description" : newProjectsDescription,
          }) 
          }).then(response => response.json())
            .then(data => {
                console.log('here is the data for updating project', data);
            }).catch(error => console.log('error', error))


    }
    const upDateProjectJson = (tar, i, e) => {
      
      let education = userData.projects;
        // console.log('here i is', i);
        // console.log('target is', e.currentTarget.textContent);
        // console.log(userData.experience[i][tar]);
        // console.log('education', education);
        education[i][tar] = e.currentTarget.textContent;
        // console.log('updated education', education);
        setChangedTrackerProjects(true);
      //  setChangedTracker(true);
        setUpdateProjects(education);

        setUpdateProjectTracker(userData.projects[i]['projectId']);

        // setUserData({...userData, education: education });

        // console.log('userDataEducation', userData.education);

    }

    const clickUpdateProject = () => {

      setUserData({...userData, projects: updateProjects });
      console.log('userDataEducation', userData.projects);
      setChangedTrackerProjects(false);
      /********************/
      // Add update option here for education

      fetch('/updateproject', {
        method : 'PUT',
        headers:{
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "projectId" : userData.projects[updateProjectTracker-1].projectId,
          "projName": userData.projects[updateProjectTracker-1].projName ,
          "description" : userData.projects[updateProjectTracker-1].description,
          "userId" : Number(userid)
        }) 
        }).then(response => response.json())
          .then(data => {
              console.log('here is the data for updating expereince', data);
          }).catch(error => console.log('error', error))
    }

    const [newbio, setNewBio ] = useState(userData.userBio);

    const updateBio = () => {
      console.log('new Bio', newbio);
      setUserData({...userData, userBio: newbio });
      setBioTracker(false);
      
      console.log('after update', userData.userBio);

      console.log('userid', userid);

      fetch('/updatebio', {
        method : 'PUT',
        headers:{
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "userId": Number(userid),
          "bio": newbio 
        }) 
        }).then(response => response.json())
          .then(data => {
              console.log('here is the data for updating bio', data);
          }).catch(error => console.log('error', error))

    }


    const updateBioInfo = (e) => {
      setBioTracker(true);
      setNewBio(e.currentTarget.textContent) ;
      console.log('newBio', newbio);

      


    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
  };

  const [base64File, setBase64URL] = useState('');

  const handleFileInputChange = e => {
      console.log(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = function() {
          setBase64URL(reader.result);
          setUserData({...userData, imageData : reader.result })

          fetch('/updatepic', {
            method : 'PUT',
            headers:{
              'Content-type':'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              "userId": Number(userid),
              "picture": reader.result
            }) 
            }).then(response => response.json())
              .then(data => {
                  console.log('here is the data for updating bio', data);
              }).catch(error => console.log('error', error))


      console.log('result', reader.result);
      console.log("file result", base64File);
      console.log('userdata', userData);
      }
      if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
      console.log('reader',reader);
      }
      
  };

    

    return (
      <div className="App">
          <NavBar />
          <div className='settingsLayout'>
              
              <SettingsCard />
          
              <div className='contentBoxSettings'>

              <div className='dpAndName'>

                  <div className='displayPicture'>
                        <img src= { userData.imageData }
                        alt='user DP' 
                        className='profilePicture'
                        />
                    </div>
                    <div className='UserNameProfile'>
                       <p> Ranjeet Mallipeddi </p> 
                    </div>
              </div>

              <div onClick={handleClick} className='changeDP'>
                  Change Display Picture 
                  <input
                  type="file"
                  ref = {hiddenFileInput}
                  style={{display: 'none'}}
                  onChange = {handleFileInputChange}/>
              </div>
                        

              <div
               className='updateButton'
               onClick={ updateBio }
               Style= { `display: ${!bioTracker ? 'none' : 'inline'}`  }
               >
                 Update
               </div>

              <div 
              className='userBio'
              contentEditable="true"
              onInput={e => updateBioInfo(e) } 
              suppressContentEditableWarning={true}
              >

                    {userData.userBio}
              </div>
               
               {/* <div className='userResume'>
                    {
                      userData.resume ===''
                      ?
                      <>
                      Please Upload your resume here
                      </>
                      :
                      <>
                        Here is your
                      </>
                    }
               </div> */}  

               <div
               className='updateButton'
               onClick={ clickUpdateEducation }
               Style= { `display: ${!changedTracker ? 'none' : 'inline'}`  }
               >
                 Update
               </div>

              <div className='Education' >

                  <div className='headerAndAdd'>

                      <div className='headingSegment'>
                          Education 
                          
                      </div>

                      <div 
                      className='addbutton'
                      onClick={addEducation }
                      >
                          Add
                      </div>
                  </div> 
             
                  <div 
                  className='addEducation' 
                  Style= { `display: ${!clickedAddEducation ? 'none' : 'flex'}`  }
                  >
                      <div className='addItems'> 
                        College/University: 
                        <input 
                        type="text" 
                        name="name" 
                        className='newNameEducation' 
                        onChange={ (e) => changeEducationName(e) }
                        /> 
                      </div>

                      <div className='addItems' > 
                        Dates: 
                        <input 
                        type="text" 
                        name="dates" 
                        className='newDatesEducation'
                        onChange={ (e) => changeEducationDates(e) }
                        /> 
                      </div>

                      <div className='addItems addDescription' > 
                        Description
                        <input 
                        type="text" 
                        name="description" 
                        className='newDescriptionEducation'
                        onChange={ (e) => changeEducationDescription(e) }
                        /> 
                      </div>

                      <div 
                      className='addItems updateAddButton' 
                      onClick = { addUpdateEducation}
                      > 
                        Update
                      </div>

                  </div>


              <div>
                {
                  userData.education.map((education, i)=>{
                    return(
                      <>
                        <div 
                        className='EduHeader' 
                        contentEditable="true"
                        onInput={e => upDateEduJson('insName', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                            {education.insName}
                        </div>

                        <div 
                        className='EduDates' 
                        contentEditable="true"
                        onInput={e => upDateEduJson('timeline', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.timeline}
                        </div>

                        <div 
                        className='EduDescription' 
                        contentEditable="true"
                        onInput={e => upDateEduJson('gpa', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.gpa}
                        </div>
                      </>
                    );
                  })
                }
              </div>

              </div>

              <div
               className='updateButton'
               onClick={ clickUpdateExperience }
               Style= { `display: ${!changedTrackerExperience ? 'none' : 'inline'}`  }
               >
                 Update
               </div>

              <div className='Education' >

                  <div className='headerAndAdd'>

                      <div className='headingSegment'>
                          Work Experience  
                          
                      </div>

                      <div 
                      className='addbutton'
                      onClick={addExperience }
                      >
                          Add
                      </div>
                  </div> 
             
                  <div 
                  className='addEducation' 
                  Style= { `display: ${!clickedAddExperience ? 'none' : 'flex'}`  }
                  >
                      <div className='addItems'> 
                        Organisation: 
                        <input 
                        type="text" 
                        name="name" 
                        className='newNameEducation' 
                        onChange={ (e) => changeExperiencenName(e) }
                        /> 
                      </div>

                      <div className='addItems' > 
                        Dates: 
                        <input 
                        type="text" 
                        name="dates" 
                        className='newDatesEducation'
                        onChange={ (e) => changeExperienceDates(e) }
                        /> 
                      </div>

                      <div className='addItems addDescription' > 
                        Description
                        <input 
                        type="text" 
                        name="description" 
                        className='newDescriptionEducation'
                        onChange={ (e) => changeExperienceDescription(e) }
                        /> 
                      </div>

                      <div 
                      className='addItems updateAddButton' 
                      onClick = { addUpdateExperience}
                      > 
                        Update
                      </div>

                  </div>


              <div>
                {
                  userData.experience.map((education, i)=>{
                    return(
                      <>
                        <div 
                        className='EduHeader' 
                        contentEditable="true"
                        onInput={e => upDateExperienceJson('company', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                            {education.company}
                        </div>

                        <div 
                        className='EduDates' 
                        contentEditable="true"
                        onInput={e => upDateExperienceJson('timeline', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.timeline}
                        </div>

                        <div 
                        className='EduDescription' 
                        contentEditable="true"
                        onInput={e => upDateExperienceJson('position', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.position}
                        </div>
                      </>
                    );
                  })
                }
              </div>

              </div>

              <div
               className='updateButton'
               onClick={ clickUpdateProject }
               Style= { `display: ${!changedTrackerProjects ? 'none' : 'inline'}`  }
               >
                 Update
               </div>

              <div className='Education' >

                  <div className='headerAndAdd'>

                      <div className='headingSegment'>
                          Projects 
                          
                      </div>

                      <div 
                      className='addbutton'
                      onClick={addProject }
                      >
                          Add
                      </div>
                  </div> 
             
                  <div 
                  className='addEducation' 
                  Style= { `display: ${!clickedAddProjects ? 'none' : 'flex'}`  }
                  >
                      <div className='addItems'> 
                        Project Name: 
                        <input 
                        type="text" 
                        name="name" 
                        className='newNameEducation' 
                        onChange={ (e) => changeProjectName(e) }
                        /> 
                      </div>

                      <div className='addItems addDescription' > 
                        Description
                        <input 
                        type="text" 
                        name="description" 
                        className='newDescriptionEducation'
                        onChange={ (e) => changeProjectDescription(e) }
                        /> 
                      </div>

                      <div 
                      className='addItems updateAddButton' 
                      onClick = { addUpdateProject }
                      > 
                        Update
                      </div>

                  </div>


              <div>
                {
                  userData.projects.map((education, i)=>{
                    return(
                      <>
                        <div 
                        className='EduHeader' 
                        contentEditable="true"
                        onInput={e => upDateProjectJson('projName', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                            {education.projName}
                        </div>

                        <div 
                        className='EduDescription' 
                        contentEditable="true"
                        onInput={e => upDateProjectJson('description', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.description}
                        </div>
                      </>
                    );
                  })
                }
              </div>

              </div>

               


                
              </div>
          </div>
          
          

      </div>
    );
  }
  
  export default Settings;