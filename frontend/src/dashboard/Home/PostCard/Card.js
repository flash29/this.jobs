import './Card.css';
import React, { useState, useEffect } from 'react';

function Card(props) {

    const [color, setColor] = useState('rgba(243, 242, 242)');
    const [likeChecker, setLikeChecker] = useState(false);

    const {
        postId,
        tag,
        updatedAt,
        likes,
        createdBy,
        createdAt,
        content,
        comments,
        attachments,
        LikesList
    } = props.postContent;

    console.log('postid', postId);
  //  console.log('tag', tag);
  //  console.log('updatedAt', updatedAt);
 //   console.log('likes', likes);
  //  console.log('createdBy', createdBy);
  //  console.log('createdAt', createdAt);
  //  console.log('content', content);
    console.log('comments', comments);
 //   console.log('attachments', attachments);
   // console.log('LikesList', LikesList);

    let timeOfPost = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - createdAt)/(60*60*24) ;
        if(differenceDate<1){
            differenceDate = differenceDate *12;
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + ' ' + 'Hours Ago';
        }
        else{
            // eslint-disable-next-line no-useless-concat
            timeOfPost = Math.floor(differenceDate) + ' ' + 'Days Ago';
        }
    }

    let likesUsers = '';
    function createLikeDisplay(){
        if (likes===1){
            likesUsers = "A user has liked your post"
        }
        else{
            likesUsers = {likes} +"users have liked this post."
        }
    }
    createLikeDisplay();
    createDate();

    function likeClicked(){
        if(!likeChecker){
            setColor('rgba(255, 188, 170, 1)');
            setLikeChecker(true);
            console.log('post liked');
        }
        else{
            setColor('rgba(243, 242, 242)');
            setLikeChecker(false);
            console.log('post unliked');
        }
        
    }


    return (
      <div className='CardType'>
          <div className='fullClass'>
            <div className="topCard">
                <div className='usernameDisplay' >{createdBy}</div> 
                <div className='timeDisplay'  >{timeOfPost}</div> 
            </div>
            <div className='PostTag'>#{tag}</div>
            <div className='Content'>
                <div className='textPost'>{content}</div>
                {
                    attachments 
                    ?
                    <>
                        <img src={'data:image/png;base64,'+attachments} alt={"Loading..."} />
                    </>
                    :
                    <>

                    </>
                }
            </div>
            <div className='likesCountDisplay'>
                {likesUsers}
            </div>
            <div className='likeAndCommentBoxes'>
                <div className='likeBox' 
                style={{backgroundColor:  color}}
                onClick={likeClicked}>Like</div>
                <div className='commentBox'>Comment</div>
            </div>
      </div>
      </div>  
      
    );
  }
  
  export default Card;