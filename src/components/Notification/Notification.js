import React, { useState, useEffect } from "react";
import { FcLike } from "react-icons/fc";
import { VscCommentDiscussion } from "react-icons/vsc";
import Post from "../Post/Post";
import { GetWithAuth, PostWithAuth } from "../../services/HttpService";

const Notification = () => {
  const [popoverShow, setPopoverShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [post, setPost] = useState(null);
  const userId = localStorage.getItem("currentUserId");
  const authToken = localStorage.getItem("authToken");

  const handleNotificationClick = (postId) => {
    getPost(postId);
  };

  const openPopover = () => {
    setPopoverShow(true);
    getNotifications();
  };

  const closePopover = () => {
    setPopoverShow(false);
  };

  const getNotifications = async () => {
    try {
      const response = await GetWithAuth(`/v1/users/activity/${userId}`);
      const responseData = await response.text();
      if (responseData) {
        const data = JSON.parse(responseData);
        setNotificationList(data);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  const getPost = async (postId) => {
    try {
      const response = await PostWithAuth(`/v1/posts/${postId}`, {});
      const data = await response.json();
      setPost(data);
      openPostPopup(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openPostPopup = (post) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-cream-color rounded-lg p-4 relative">
          <button
            className="absolute top-0 right-2 m-2 text-lg text-navbar-item-color hover:text-dark-reddish-brown"
            onClick={() => setPost(null)}
          >
            Close
          </button>
          <Post
            userId={post.userId}
            userName={post.userName}
            postId={post.id}
            title={post.title}
            text={post.text}
            likes={post.postLikes}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        className="text-white font-bold font-lato"
        type="button"
        onClick={openPopover}
      >
        Notifications
      </button>
      {popoverShow && (
        <div
          className="absolute z-100 bg-light-peachy-brown"
          style={{ top: "44px", left: "-100px", width: "300px" }}
        >
          <div className="bg-dark-reddish-brown text-navbar-item-color px-4 py-3 flex justify-between items-center">
            <h2 className="text-md font-bold font-lato">Notifications</h2>
            <button className="text-white" onClick={closePopover}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="divide-y divide-taupe-color">
            {notificationList.length === 0 ? (
              <div className="px-4 py-3">
                <span className="font-lato text-sm text-black">
                  You currently have no new notifications, how about interacting
                  more!
                </span>
              </div>
            ) : (
              notificationList.map((row) => (
                <div
                  className="px-4 py-3 cursor-pointer hover:bg-cream-color"
                  onClick={() => handleNotificationClick(row[1])}
                  key={row[1]}
                >
                  <div className="flex items-center">
                    {row[0] === "liked" ? (
                      <FcLike className="text-red-500 mr-2" />
                    ) : (
                      <VscCommentDiscussion className="text-blue-500 mr-2" />
                    )}
                    <span className="font-lato text-sm text-black">
                      {row[2] + " " + row[0] + " your post."}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {post && openPostPopup(post)}
    </div>
  );
};

export default Notification;
