import React, { useState, useEffect } from "react";
import { PostWithAuth } from "../../services/HttpService";

const CommentForm = (props) => {
  const { postId, userId, refreshComments } = props;
  const [commentText, setCommentText] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isSent) {
      timeoutId = setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveComment();
  };

  const handleCommentText = (event) => {
    setCommentText(event.target.value);
    setIsSent(false);
  };

  const saveComment = () => {
    PostWithAuth("/v1/comments", {
      postId: postId,
      userId: userId,
      text: commentText,
    })
      .then((res) => res.json())
      .then(() => {
        setCommentText("");
        refreshComments(postId);
        setIsSent(true);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <div className="flex items-center justify-center">
      {isSent && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md opacity-100 transition-opacity duration-00">
          <p className="text-lg font-lato font-semibold">Success!</p>
          <p className="font-lato">
            The comment has been created successfully.
          </p>
        </div>
      )}
      <div className="w-full">
        <textarea
          className="block w-full p-3 text-black border rounded-md bg-cream-color text-base font-lato"
          name="comment"
          placeholder="Write your comment here..."
          onChange={handleCommentText}
          value={commentText}
        />
        <button
          className="text-white bg-first-blue hover:bg-second-blue font-bold font-lato rounded-md text-sm px-4 py-2.5 text-center mt-4"
          onClick={handleSubmit}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
