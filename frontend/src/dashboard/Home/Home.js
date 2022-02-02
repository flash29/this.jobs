import NavBar from '../../components/NavBar/NavBar'
import PostBox from '../../components/PostBox/PostBox'

function Home() {
  return (
    <div className="App">
      <NavBar />
      <PostBox/>
      You are in home page
    </div>
  );
}

export default Home;