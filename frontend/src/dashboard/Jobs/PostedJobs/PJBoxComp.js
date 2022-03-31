import ServerLost from '../../../ErrorPage/ServerLost'
import FeedEmpty from '../../../ErrorPage/FeedEmpty'
import PJCard from './PJCard';

function PJBoxComp(props) {
    console.log('props', props);
  return (
      <>
      {
          props.posts === undefined ?
            <ServerLost />
            :
            <>
            {
                props.posts.length === 0 ?
                <FeedEmpty />
                :
                <>
                {
                    props.posts.map((post, i)=>{
                        console.log('anslist', post);
                        return (
                          <PJCard 
                            key ={i}
                            postContent = {post}
                          />
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