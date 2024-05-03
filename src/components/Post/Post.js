import React, { useState, useEffect, useRef } from "react";
import { FcLike, FcDislike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import CommentForm from "../Comment/CommentForm";
import Comment from "../Comment/Comment";
import {
  PostWithAuth,
  GetWithoutAuth,
  DeleteWithAuth,
} from "../../services/HttpService";

function Post(props) {
  const { postId, title, text, userId, userName, likes } = props;
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isFirstLoad = useRef(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  // Local Storage Objects
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUser = localStorage.getItem("currentUser");
  const authToken = localStorage.getItem("authToken");

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike(likeId);
      setLikeCount(likeCount - 1);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      setSelectedPostId(postId);
    }
    setShowComments(!showComments);
  };

  const refreshComments = (postId) => {
    GetWithoutAuth("/v1/comments?postId=" + postId)
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

  const saveLike = () => {
    PostWithAuth("/v1/likes", {
      postId: postId,
      userId: currentUserId,
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeId(data.id);
      })
      .catch((err) => console.log("error"));
  };

  const deleteLike = (likeId) => {
    DeleteWithAuth("/v1/likes/" + likeId).catch((err) => console.log("error"));
  };

  const checkLike = () => {
    let likeControl = likes.find((like) => like.userId === currentUserId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) isFirstLoad.current = false;
    else {
      if (selectedPostId !== null) {
        refreshComments(selectedPostId);
      }
    }
  }, [selectedPostId]);

  useEffect(() => {
    checkLike();
  }, []);

  return (
    <div className="bg-inherit flex items-center justify-center">
      <div className="max-w-md rounded overflow-hidden shadow-lg w-[512px] mt-8">
        <div className="px-4 py-4 bg-light-peachy-brown">
          {/* User Photo and Name Section */}
          <a href={"/v1/users/" + userId}>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-first-blue rounded-full">
              <span className="font-lato font-medium text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-lato font-bold text-black ml-4">
              {userName.toUpperCase()}
            </span>
          </a>

          <div className="font-bold font-lato text-xl mb-2 mt-2 text-black">
            {title}
          </div>
          <p className="text-black font-lato text-base font-normal">{text}</p>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25" />
          {/* Clickable Buttons */}
          {/* Like/Dislike Button */}
          <div className="mt-4 text-xl flex items-center">
            <button onClick={toggleLike} className="mr-1">
              {isLiked ? (
                <span role="img" aria-label="like">
                  <FcDislike />
                </span>
              ) : (
                <span role="img" aria-label="unlike">
                  <FcLike />
                </span>
              )}
            </button>
            <span className="text-black font-bold font-lato">{likeCount}</span>
            {/* Comments Button */}
            <button onClick={() => toggleComments(postId)} className="ml-2">
              <FaRegComment className="ml-2 text-black" />
            </button>
          </div>

          {/* Openable Comments Section */}
          {showComments && (
            <div className="mt-4 text-black font-lato text-base">
              <div>
                {error
                  ? "error"
                  : isLoaded
                  ? commentList.map((comment) => (
                      <Comment
                        key={comment.id}
                        userId={comment.userId}
                        userName={comment.userName}
                        text={comment.text}
                      />
                    ))
                  : "Loading"}
              </div>
            </div>
          )}
          {showComments && (
            <CommentForm
              userId={currentUserId}
              postId={postId}
              refreshComments={refreshComments}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
