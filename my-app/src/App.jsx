import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Author from "./pages/Author";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/post/author/:id" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;