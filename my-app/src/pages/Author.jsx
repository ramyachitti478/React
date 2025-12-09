import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const [localPosts, setLocalPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    // local posts
    useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts")) || [];
    setLocalPosts(stored);
    }, []);

    return (
    <div className="all-posts-search-section author-posts">
        <Link to="/" className="post-details-backBtn">Back</Link>
        <div className="all-post-creation">
        <h1 className="all-posts-heading">Posts by {id}</h1>
        {user && <Link className="create-new-post" to={"/post/new"}>Create Post</Link>}
        </div>

        <div className="all-posts">
        {localPosts.length === 0 && <p className="muted">No personal posts yet.</p>}
        {localPosts.filter(post => post.author === id).map(post => (
            <div key={post.id} className="post-details">
            {console.log(id, post.id)}
            {/* <div className="edit-delete-posts-section">
                {user.email === post.authorEmail && (
                    <>
                        <button className="editPost" onClick={() => navigate(`/post/edit/${post.id}`)}><img src="../src/assets/icons-edit-24.png" /></button>
                        <button className="deletePost" onClick={() => handleDeleteLocal(post.id)}><img src="../src/assets/icons-delete-24.png" /></button>
                    </>
                )}
            </div> */}
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
            <small>By {post.author} • {post.date ? new Date(post.date).toLocaleString() : ""}</small>
            <div><Link to={`/post/${post.id}`}>Read More</Link></div>
            </div>
        ))}
        </div>
    </div>
    );
}