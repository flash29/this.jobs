import ServerLost from '../../../ErrorPage/ServerLost'
import FeedEmpty from '../../../ErrorPage/FeedEmpty'
import PJCard from './PJCard';
import { useState } from 'react'
import './PJBoxComp.css';
import { Link} from "react-router-dom";

// function Applicants(state){
//   if(state === 'yes'){  
//     return (<div>Applicants</div>);
//   }
//   else{
//     return(<div> </div>);
//   }  
// }

function PJBoxComp(props) {
  const [state, setState] = useState('no');
  return (
      <>
      {
          props.posts === undefined ?
            <ServerLost />
            :
            <>
            {
                props.posts.length === 0 ?
                <FeedEmpty className = "feedEmpty1"/>
                :
                <>
                {
                    props.posts.map((post, i)=>{
                        console.log('anslist', post);
                        return (
                          <div className = "grid-container-element2">
                            {/* <Link to = "#" onClick = {(e) => {setState('yes'); console.log(state)}}>
                              <PJCard 
                                  key ={i}
                                  postContent = {post}
                                  className="grid-child-element purple"
                                />
                            </Link> */}
                             <PJCard 
                                  key ={i}
                                  postContent = {post}
                                  className="grid-child-element purple"
                                />
                            {/* <Applicants className="grid-child-element green" state = {state}/> */}
                          </div>
                        );
                      })
                }
                </>
            }
            </>
      }
    </>
  );
}

export default PJBoxComp;