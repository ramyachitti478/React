import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";
import MESSAGES from "../constants/MESSAGES";
import APICALLS from "../constants/APICALLS";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [storedPosts, setstoredPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);

  useEffect(() => {
    console.log("in")
    axios.get(APICALLS.JSON_POSTS_API)
      .then(res => setPosts(res.data))
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    logout();           
    navigate("/login"); 
  };

  const handleDeletePost = (id) => {
    if (!confirm(MESSAGES.POST_DELETE_CONFIRM)) return;
    const filteredStoredPosts = storedPosts.filter(post => post.id !== id)
    setstoredPosts(filteredStoredPosts);    
    localStorage.setItem("posts", JSON.stringify(filteredStoredPosts));
  }

  return (
    <div className="all-posts-search-section">
      <div className="heading-logout-section">
        {user ? (
          <>
            <h3>{MESSAGES.WELCOME_MSG}, {user?.name ?? ''}!</h3>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>{MESSAGES.LOGIN_TO_ACCESS} click here: <Link to="/login">Login</Link></p>
        )}
      </div>
      <div className="all-post-creation">
        <h1 className="all-posts-heading">All Posts</h1>
        <Link className="create-new-post" to={`/post/new`}>Create Post</Link>
      </div>
      
      <input className="search-posts" name="search posts" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="all-posts">
        {/* <h3>Explore Blogs</h3> */}
        {storedPosts.slice().reverse().map(post => (
          <div key={post.id} className="post-details">
            <div className="edit-delete-posts-section">
              <button className="editPost" onClick={() => navigate(`/post/edit/${post.id}`)}><img src="../src/assets/icons-edit-24.png" /></button>
              <button className="deletePost" onClick={() => handleDeletePost(post.id)}><img src="../src/assets/icons-delete-24.png" /></button>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <Link className="post-read-more-link" to={`/post/${post.id}`}>Read More</Link>
          </div>
        ))}
        {/* <h3>My Blogs</h3> */}
        {filteredPosts.slice().reverse().map(post => (
          <div key={post.id} className="post-details">
            {/* <div className="edit-delete-posts-section">
              <button className="editPost" onClick={() => navigate(`/post/edit/${post.id}`)}><img src="../src/assets/icons-edit-24.png" /></button>
              <button className="deletePost" onClick={() => handleDeletePost(post.id)}><img src="../src/assets/icons-delete-24.png" /></button>
            </div> */}
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <Link className="post-read-more-link" to={`/post/${post.id}`}>Read More</Link>
          </div>
        ))} 
      </div>
      </div>
  );
}