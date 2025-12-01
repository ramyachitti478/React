import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./postDetails.css";
import MESSAGES from "../constants/MESSAGES";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];;
    const found = storedPosts.find((post) => id == post.id);
    setPost(found || null);
  }, []);

  if (!post) {
    return <h2>{MESSAGES.POST_NOT_FOUND}</h2>;
  }

  return (
    <div className="post-details-section">
      <div className="post-details-container">
        <h1 className="post-details-title">{post.title}</h1>
        <p className="post-details-body">{post.body}</p>
        <p className="post-details-author">
          <strong>{post.author}</strong> 
          <strong>{post.date}</strong> 
        </p>
      </div>
      <Link to="/" className="post-details-backBtn">Back to Home</Link>
    </div>
  );
}