import ServerLost from '../../../ErrorPage/ServerLost'
import FeedEmpty from '../../../ErrorPage/FeedEmpty'
import Card from './Card';

function PostCard(props) {
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
                          <Card 
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

export default PostCard;