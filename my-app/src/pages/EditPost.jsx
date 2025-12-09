import { useState, useContext, useEffect} from "react";
// import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./NewPost.css";
import MESSAGES from "../constants/MESSAGES";

export default function EditPost() {
//   const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id }= useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");


useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.find((post) => id == post.id);
    if(!post) {
        alert(MESSAGES.POST_NOT_FOUND);
        // setError("post not found");
        navigate('/');
    }
    console.log("call");
    
    setTitle(post.title);
    setBody(post.body);
}, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError(MESSAGES.FILL_ALL_FIELDS);
      return;
    }

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map((post) => id == post.id ? {...post, title, body} : post);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/");
  };

  return (
    <div className="create-post-container">
      <Link to="/" className="post-details-backBtn">Back</Link>
      <div className="create-new-post-div">
        <h2>Update Post</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleUpdate} className="post-creation-form">
          <input type="text" name="post-title" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <textarea name="post-body" placeholder="Write your post here..." value={body} onChange={(e) => setBody(e.target.value)} rows="6"></textarea>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
}
