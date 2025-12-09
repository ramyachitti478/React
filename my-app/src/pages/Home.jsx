import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";
import MESSAGES from "../constants/MESSAGES";
import APICALLS from "../constants/APICALLS";

export default function Home() {
  const [apiPosts, setApiPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest"); 
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // API posts
  useEffect(() => {
    axios.get(APICALLS.JSON_POSTS_API)
      .then(res => setApiPosts(res.data || []))
      .catch(() => setApiPosts([]));
  }, []);

  // local posts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts")) || [];
    setLocalPosts(stored);
  }, []);

  // delete
  const handleDeleteLocal = (id) => {
    if (!confirm(MESSAGES.POST_DELETE_CONFIRM)) return;
    const updated = localPosts.filter(p => p.id !== id);
    setLocalPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
    alert(MESSAGES.POST_DELETED);
  };

  const handleLogout = () => {
    logout();           
    navigate("/login"); 
  };

  const match = (post, authorName = "") => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (post.title + " " + post.body + " " + authorName).toLowerCase().includes(q);
  };

  // sort posts
  const sortPosts = (arr, byDateKey = "date") => {
    return [...arr].sort((a, b) => {
      const aDate = a[byDateKey] ? new Date(a[byDateKey]) : new Date(0);
      const bDate = b[byDateKey] ? new Date(b[byDateKey]) : new Date(0);
      return sort === "latest" ? bDate - aDate : aDate - bDate;
    });
  };

  // search
  const filteredApi   = apiPosts.filter(p => match(p));
  const filteredLocal = localPosts.filter(p => match(p, p.author || ""));
  const displayLocal  = sortPosts(filteredLocal, "date");
  const displayApi    = sortPosts(filteredApi, "date");

  return (
    <div className="all-posts-search-section">
      <div className="heading-logout-section">
        {user ? (
          <>
            <h3>{MESSAGES.WELCOME_MSG}, {user?.name}!</h3>
            <div>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <p>{MESSAGES.LOGIN_TO_ACCESS} <Link to="/login">Login</Link></p>
        )}
      </div>
      <div className="all-post-creation">
        <h1 className="all-posts-heading">All Posts</h1>
        {user && <Link className="create-new-post" to={"/post/new"}>Create Post</Link>}
      </div>

      <div className="search-sort-container">
        <input className="search-posts" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="all-posts">
        {/* <h3 className="section-heading">My Blogs</h3> */}
        {displayLocal.length === 0 && <p className="muted">No personal posts yet.</p>}
        {displayLocal.map(post => (
          <div key={post.id} className="post-details">
            <div className="edit-delete-posts-section">
              {console.log(post, user)}
              {user.email === post.authorEmail && (
                <>
                  <button className="editPost" onClick={() => navigate(`/post/edit/${post.id}`)}><img src="../src/assets/icons-edit-24.png" /></button>
                  <button className="deletePost" onClick={() => handleDeleteLocal(post.id)}><img src="../src/assets/icons-delete-24.png" /></button>
                </>
              )}
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <small>By <Link to={`/post/author/${post.author}`}>{post.author}</Link> • {post.date ? new Date(post.date).toLocaleString() : ""}</small>
            <div><Link to={`/post/${post.id}`}>Read More</Link></div>
          </div>
        ))}
        {/* <h3 className="section-heading">Community Blogs</h3> */}
        {displayApi.length === 0 && <p className="muted">No community posts available.</p>}
        {displayApi.map(post => (
          <div key={post.id} className="post-details">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <small>By API Author #{post.userId}</small>
            <div><Link to={`/post/${post.id}`}>Read More</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}