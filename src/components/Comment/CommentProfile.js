import React from "react";

const CommentProfile = (props) => {
  const { text, userId, userName } = props;
  return (
    <div className="border px-4 py-4 mb-4 rounded-md flex flex-col bg-light-peachy-brown">
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
      <p className="text-md leading-relaxed mt-1 mb-2 ml-0">{text}</p>
    </div>
  );
};

export default CommentProfile;
