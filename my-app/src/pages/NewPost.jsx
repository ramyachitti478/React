import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import MESSAGES from "../constants/MESSAGES";

export default function NewPost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError(MESSAGES.FILL_ALL_FIELDS);
      return;
    }

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
    const newPost = {
      id: Date.now(),
      title,
      body,
      author: user.name,
      authorEmail: user.email,
      date: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...storedPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setTitle("");
    setBody("");
    alert(MESSAGES.POST_CREATED)
    navigate("/");
  };

  return (
    <div className="create-new-post-div">
      <h2>Create a New Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="post-creation-form">
        <input type="text" name="post-title" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="post-body" placeholder="Write your post here..." value={body} onChange={(e) => setBody(e.target.value)} rows="6"></textarea>
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
}