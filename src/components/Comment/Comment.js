import React from "react";

const Comment = (props) => {
  const { text, userId, userName } = props;
  return (
    <div className="max-w-md mx-auto border px-2 py-2 mb-2 rounded-md">
      <div className="flex items-center mb-0">
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
      </div>
      <p className="text-md leading-relaxed mt-2 mb-2">{text}</p>
      <div className="flex justify-between items-center">
        <div>
          <a href="#" className="text-first-blue hover:text-third-blue mr-4">
            <i className="far fa-thumbs-up"></i> Like
          </a>
          {/* Other Options 
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-comment-alt"></i> Reply
          </a>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
            <i className="far fa-flag"></i> Report
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-share-square"></i> Share
          </a>
          */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
