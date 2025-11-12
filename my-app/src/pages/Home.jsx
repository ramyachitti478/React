import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";

export default function Home() { //review
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const user = useContext(AuthContext);
  

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => setPosts(res.data))
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="all-posts-search-section">
      <div style={{ padding: "20px" }}>
        <h1>Hello Home</h1>
        {console.log(user)}
        {user ? (
          <h3>Welcome back, {user.username}!</h3>
        ) : (
          <p>Please log in to create or manage posts.</p>
        )}
      </div>
      <h1 className="all-posts-heading">All Posts</h1>

      <input
        className="search-posts"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="all-posts">
        {filteredPosts.slice().reverse().map(post => (
          <div key={post.id} className="post-details">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <Link className="post-read-more-link" to={`/post/${post.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}