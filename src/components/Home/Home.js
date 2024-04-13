import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/v1/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div className="bg-cream-color h-screen w-screen">
      <PostForm
        userId={localStorage.getItem("currentUserId")}
        userName={localStorage.getItem("currentUser")}
        refreshPosts={refreshPosts}
      />
      {postList.map((post) => (
        <Post
          key={post.id}
          userId={post.userId}
          userName={post.userName}
          postId={post.id}
          title={post.title}
          text={post.text}
          likes={post.postLikes}
        ></Post>
      ))}
    </div>
  );
};

export default Home;
