import './Card.css';
import React, { useState, useEffect } from 'react';
import CommentCard from '../CommentCard/CommentCard';
import { useNavigate } from "react-router-dom";

function Card(props) {
    let navigate = useNavigate();
    console.log("card", props);
    const [color, setColor] = useState('rgba(243, 242, 242)');
    const [likeChecker, setLikeChecker] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [commentChecker, setCommentChecker] = useState(false);

    const {
        postId,
        tag,
        updatedAt,
        likes,
        createdBy,
        creatorId,
        createdAt,
        content,
        comments,
        attachments,
        LikesList
    } = props.postContent;

    console.log('postid', postId);

    console.log('comments', comments);


    let timeOfPost = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - createdAt)/(60*60*24) ;
        if(differenceDate<1){
            // console.log('check proper time here', differenceDate*24 );
            differenceDate = differenceDate *24;
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
            likesUsers = likes +" users have liked this post."
        }
    }
    createLikeDisplay();
    createDate();

    const onLikeClicked = (likeValue) =>{
        fetch('/updatelikes',{
            method:'put',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                postId: postId,
                user_id: createdBy,
                liked: likeValue
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
        })
        .catch(error => console.log('error', error))
    }

    function likeClicked(){
        if(!likeChecker){
            setColor('rgba(255, 188, 170, 1)');
            setLikeChecker(true);
            onLikeClicked(true);
            console.log('post liked');
        }
        else{
            setColor('rgba(243, 242, 242)');
            setLikeChecker(false);
            onLikeClicked(false);
            console.log('post unliked');
        }
        
    }

    function onCommentContentChange(event){
        setCommentContent(event.target.value);

    }
    
    function commentClicked(){
        console.log(commentContent);
        fetch('/postcomment',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                    commentData : commentContent,
                    createdBy : createdBy,
                    post_id: postId
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setCommentContent('');
            window.location.reload(false);
        })
        .catch(error => console.log('error', error))
    }

    function onCommentDisplayClicked(){
        if(!commentChecker){
            setCommentChecker(true);
        }
        else{
            setCommentChecker(false);
        }
    }

    const clickHandler = () => {
        console.log(props.postContent.creatorId)
        let path = "/settings/profile/"+props.postContent.creatorId;
        navigate(path);
    }

    return (
      <div className='CardType'>
          <div className='fullClass'>
            <div className="topCard">
                <div className='usernameDisplay' onClick={clickHandler} >{createdBy}</div> 
                <div className='timeDisplay'  >{timeOfPost}</div> 
            </div>
            <div className='PostTag'>#{tag}</div>
            <div className='Content'>
                <div className='textPost'>{content}</div>
                {
                    attachments 
                    ?
                    <>
                        <img src={attachments} alt={"Loading..."} />
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
                <div className='commentBox' onClick={onCommentDisplayClicked}>Comments</div>
            </div>
            {
                commentChecker 
                ?
                <>
                 {
                    comments.map((comment, i)=>{
                        console.log('comments', comment);
                        return (
                          <CommentCard 
                            key ={i}
                            commentContent = {comment}
                          />
                        );
                      })
                }
                </>
                :
                <></>
            }
            <div className='AddComment'>
                <input 
                type="text"
                placeholder = "Add a comment..."
                className='CommentAddBox'
                onChange={(e)=> onCommentContentChange(e) }
                value={commentContent}
                />
                <div className='CommentAddButton' onClick={()=>commentClicked()}> Comment </div>
            </div>
      </div>
      </div>  
      
    );
  }
  
  export default Card;