import NavBar from '../../components/NavBar/NavBar'
import PostCard from './PostCard/PostCard';
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
      <PostCard posts={posts}/>
    </div>
  );
}

export default Home;