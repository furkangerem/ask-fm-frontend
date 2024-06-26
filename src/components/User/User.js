import React, { useState, useEffect } from "react";
import PostProfile from "../Post/PostProfile";
import CommentProfile from "../Comment/CommentProfile";
import { GetWithAuth } from "../../services/HttpService";

const User = () => {
  const currentUser = localStorage.getItem("currentUser");
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUserFirstName = localStorage.getItem("currentUserFirstName");
  const currentUserLastName = localStorage.getItem("currentUserLastName");
  const authToken = localStorage.getItem("authToken");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [postButton, setPostButton] = useState(true);
  const [commentButton, setCommentButton] = useState(false);
  const totalPostCounter = postList.length;
  const totalCommentCounter = commentList.length;

  const refreshPosts = () => {
    GetWithAuth("/v1/posts?userId=" + currentUserId)
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

  const refreshComments = () => {
    GetWithAuth("/v1/comments?userId=" + currentUserId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
    refreshComments();
  }, []);

  const handlePostButtonClick = () => {
    setPostButton(true);
    setCommentButton(false);
  };

  const handleCommentButtonClick = () => {
    setPostButton(false);
    setCommentButton(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-cream-color h-screen">
      <div className="px-3 py-2">
        <div className="flex flex-col gap-1 text-center">
          <a
            className="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg"
            href=""
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg')",
            }}
          ></a>
          <p className="font-lato font-bold">
            {currentUserFirstName} {currentUserLastName}
          </p>
          <p className="font-lato font-bold">{currentUser}</p>
        </div>

        <div className="flex justify-center items-center gap-8 my-3">
          <div className="font-semibold text-center">
            <p className="text-black">{totalPostCounter}</p>
            <span className="text-gray-400">Posts</span>
          </div>
          <div className="font-semibold text-center">
            <p className="text-black">{totalCommentCounter}</p>
            <span className="text-gray-400">Comments</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            className={`w-full py-2 ${
              postButton ? "border-b-2 border-yellow-400" : ""
            }`}
            onClick={handlePostButtonClick}
          >
            Posts
          </button>
          <button
            className={`w-full py-2 ${
              commentButton ? "border-b-2 border-yellow-400" : ""
            }`}
            onClick={handleCommentButtonClick}
          >
            Comments
          </button>
        </div>

        {postButton && (
          <>
            {totalPostCounter === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                First post yet! How about creating one?
              </p>
            ) : (
              <div className="my-3 gap-2 bg-cream-color">
                {postList.map((post) => (
                  <PostProfile
                    key={post.id}
                    userId={post.userId}
                    userName={post.userName}
                    title={post.title}
                    text={post.text}
                    likes={post.postLikes}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {commentButton && (
          <>
            {totalCommentCounter === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                First comment yet! How about creating one?
              </p>
            ) : (
              <div className="my-3 gap-2">
                {commentList.map((comment) => (
                  <CommentProfile
                    key={comment.id}
                    userId={currentUserId}
                    userName={currentUser}
                    text={comment.text}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
