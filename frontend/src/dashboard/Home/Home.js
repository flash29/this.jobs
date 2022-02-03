import NavBar from '../../components/NavBar/NavBar'
import PostCard from './PostCard/PostCard';
import PostBox from '../../components/PostBox/PostBox';
import React, { useState, useEffect } from 'react';



function Home() {

  const [posts, setPosts] = useState();

  async function getPosts () {
      fetch('/feed')
        .then(res => res.json())
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
      This is the home page
      <PostCard posts={posts}/>
    </div>
  );
}

export default Home;