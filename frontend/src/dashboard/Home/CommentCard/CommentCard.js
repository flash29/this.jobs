import './CommentCard.css'

function CommentCard(props) {
    const {
        commentData,
        commentId,
        createdAt,
        createdBy,
        post_id,
        updatedAt
    } = props.commentContent;

    let timeOfPost = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - createdAt)/(60*60*24) ;
        if(differenceDate<1){
            differenceDate = differenceDate *24;
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + ' ' + 'Hours Ago';
        }
        else{
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + ' ' + 'Days Ago';
        }
    }

    createDate();

    return (
      <div className="commentCardDisplay">
          <div className='usernameAndTime'> 
                <div className='usernameComments'>{createdBy} </div>
                <div className='timeComments'> {timeOfPost} </div>
          
          </div>
          <div className='commentText' > {commentData} </div>
      </div>
    );
  }
  
  export default CommentCard;