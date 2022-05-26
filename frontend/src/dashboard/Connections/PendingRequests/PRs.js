import './PRs.css';
import PRCard from './PRCard';
import ServerLost from '../../../ErrorPage/ServerLost'

function PRs(props){
    console.log('props', props);

    return(
        <>{
            props.props === undefined ?
                <ServerLost className = "serverLost"/>
            :
            <>
            {
                props.props.length === 0 ?
                <>No Pending Requests!</>
                :
                props.props.map((post, i) => {
                  console.log("connections", post);
                  return(
                    <PRCard key = {i} postContent = {post} className = "PRCard"/>
                  )  
                })
            }
            </>
        }</>
    )
}

export default PRs;