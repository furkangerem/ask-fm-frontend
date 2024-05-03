import React, { useState, useEffect, useRef } from "react";
import { FcLike, FcDislike } from "react-icons/fc";

function PostProfile(props) {
  const { postId, title, text, userId, userName, likes } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isFirstLoad = useRef(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  // Local Storage Objects
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUser = localStorage.getItem("currentUser");
  const authToken = localStorage.getItem("authToken");

  const checkLike = () => {
    let likeControl = likes.find((like) => like.userId === currentUserId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    checkLike();
  }, []);

  return (
    <div className="bg-inherit">
      <div className="rounded overflow-hidden shadow-lg mb-2">
        <div className="px-4 py-4 bg-light-peachy-brown flex flex-col">
          <a href={"/v1/users/" + userId} className="flex items-center mb-2">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-first-blue rounded-full">
              <span className="font-lato font-medium text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-lato font-bold text-black ml-2">
              {userName.toUpperCase()}
            </span>
          </a>
          <div className="font-bold font-lato text-xl mb-2 mt-1">{title}</div>
          <p className="text-black font-lato text-base mb-2">{text}</p>
          <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25" />
          <div className="mt-2 text-xl flex items-center">
            <button className="mr-1">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostProfile;
