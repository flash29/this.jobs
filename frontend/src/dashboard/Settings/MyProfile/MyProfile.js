import NavBar from '../../../components/NavBar/NavBar'
import '../Settings.css';
import  { useParams } from "react-router-dom";
import SettingsCard from '../SettingsCard';
import { useState, useEffect } from 'react';
import dp from './dp1.jpg';

function Settings() {

  //  let params = useParams();

    const [userData, setUserData] = useState({
      imageData : '',
      userName : '',
      userBio: '',
      projects: [],
      experience: [],
      education: [],
      resume: '',
      test: ''
    });

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



    // setUserData();
    useEffect(()=>{

      
      setUserData({...userData, education: [
        {
          'name': 'University Of Florida',
          'dates': 'Aug 2021 - May 2023',
          'description': 'GPA : 3.89/ 4'
        },
        {
          'name': 'JNTUH',
          'dates': 'Aug 2016 - May 2021',
          'description': 'GPA : 7.89/ 10'
        }
      ], 
      userBio: 'Actively Looking for Summer Internships || Ex-Quantium ' ,
      experience: [
        {
          'name': 'Quantium',
          'dates': 'Jan 2020 - July 2020',
          'description': 'Data Analyst - Intern'
        }, 
        {
          'name': 'Meta',
          'dates': 'May 2023 - Present',
          'description': 'Software Engineer'
        }
      ]
    
    }
      
      )

      setUpdateEducation(userData.education);
      setUpdateExperience(userData.experience);

    }, []);

    const clickUpdateEducation = () => {
      setUserData({...userData, education: updateEducation });
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
        console.log(userData.education[i][tar]);
        console.log('education', education);
        education[i][tar] = e.currentTarget.textContent;
        console.log('updated education', education);
        setChangedTracker(true);
        setUpdateEducation(education);

        // setUserData({...userData, education: education });

        // console.log('userDataEducation', userData.education);

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
        newData['name'] = newEducationName;
        newData['dates'] = newEducationDates;
        newData['description'] = newEducationDescription;
        educationData.push(newData);
        setUserData({...userData, education:  educationData });
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
        newData['name'] = newExperienceName;
        newData['dates'] = newExperienceDates;
        newData['description'] = newExperienceDescription;
        educationData.push(newData);
        setUserData({...userData, experience:  educationData });
        console.log('new work experience');

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

        // setUserData({...userData, education: education });

        // console.log('userDataEducation', userData.education);

    }

    const clickUpdateExperience = () => {
      setUserData({...userData, experience: updateExperience });
      console.log('userDataEducation', userData.experience);
      setChangedTrackerExperience(false);
      /********************/
      // Add update option here for education
    }
    const [newbio, setNewBio ] = useState(userData.userBio);

    const updateBio = () => {
      console.log('new Bio', newbio);
      setBioTracker(false);
      setTimeout(3000);
      setUserData({...userData, userBio: newbio });
      console.log('after update', userData.userBio);
    }
    const updateBioInfo = (e) => {
      setBioTracker(true);
      setNewBio(e.currentTarget.textContent) ;
      console.log('newBio', newbio);


    }
    

    return (
      <div className="App">
          <NavBar />
          <div className='settingsLayout'>
              
              <SettingsCard />
          
              <div className='contentBoxSettings'>

              <div className='dpAndName'>

                  <div className='displayPicture'>
                        <img src= {dp}
                        alt='user DP' 
                        className='profilePicture'
                        />
                    </div>
                    <div className='UserNameProfile'>
                       <p> Ranjeet Mallipeddi </p> 
                    </div>
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
                        onInput={e => upDateEduJson('name', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                            {education.name}
                        </div>

                        <div 
                        className='EduDates' 
                        contentEditable="true"
                        onInput={e => upDateEduJson('dates', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.dates}
                        </div>

                        <div 
                        className='EduDescription' 
                        contentEditable="true"
                        onInput={e => upDateEduJson('description', i, e) } 
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
                        onInput={e => upDateExperienceJson('name', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                            {education.name}
                        </div>

                        <div 
                        className='EduDates' 
                        contentEditable="true"
                        onInput={e => upDateExperienceJson('dates', i, e) } 
                        suppressContentEditableWarning={true}
                        >
                         {education.dates}
                        </div>

                        <div 
                        className='EduDescription' 
                        contentEditable="true"
                        onInput={e => upDateExperienceJson('description', i, e) } 
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