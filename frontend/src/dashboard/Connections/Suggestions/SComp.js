import './SComp.css';
import SCard from './SCard';
import ServerLost from '../../../ErrorPage/ServerLost'

function SComp(props){
    console.log('props', props);

    return(
        <>{
            props.props === undefined ?
                <ServerLost className = "serverLost"/>
            :
            <>
            {
                props.props.length === 0 ?
                <>No Suggestions for you!</>
                :
                props.props.map((post, i) => {
                  console.log("people you may know", post);
                  return(
                    <SCard key = {i} postContent = {post} className = "SCard"/>
                  )  
                })
            }
            </>
        }</>
    )
}

export default SComp;