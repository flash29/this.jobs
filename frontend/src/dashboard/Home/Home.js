import NavBar from '../../components/NavBar/NavBar'
import PostCard from './PostCard/PostCard';
import PostBox from '../../components/PostBox/PostBox';
import React, { useState, useEffect } from 'react';



function Home() {

  const [posts, setPosts] = useState();

  async function getPosts () {
      fetch('/feed/following/'+ sessionStorage.getItem('userid'), {
        //headers:{'Content-type':'application/json'},
        headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
        //body:JSON.stringify(postData),
    }).then(res => res.json())
        .then(res => setPosts(res) )
        .catch(error => console.log('error getting Feed'))
  }
  useEffect(() => {
    getPosts();
    console.log('posts', posts);
  }, []);


  return (
    <div className="App">
      <NavBar />
      <PostBox />
      <PostCard posts={posts}/>
    </div>
  );
}

export default Home;