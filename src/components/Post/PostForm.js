import React, { useState, useEffect } from "react";

function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };
  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
  };
  const handleClear = () => {
    setIsSent(false);
    setTitle("");
    setText("");
  };

  const savePost = () => {
    fetch("/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSent(true);
        refreshPosts();
      })
      .catch((err) => console.log("error"));
  };

  useEffect(() => {
    let timer;
    if (isSent) {
      timer = setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isSent]);

  return (
    <div>
      {isSent && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md opacity-100 transition-opacity duration-00">
          <p className="text-lg font-lato font-semibold">Success!</p>
          <p className="font-lato">The post has been created successfully.</p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="max-w-md rounded overflow-hidden shadow-lg w-[512px] mt-8">
          <div className="px-4 py-4 bg-light-peachy-brown">
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

            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 dark:opacity-100" />
            <div className="font-bold font-lato text-xl mb-2 mt-2 relative">
              <label
                htmlFor="post-form-title"
                className="block mb-2 text-md font-bold font-lato text-black"
              >
                New Post
              </label>
              <input
                type="text"
                id="post-form-title"
                placeholder="Title"
                value={title}
                maxLength="250"
                className="block w-full p-4 text-black border rounded-md bg-cream-color text-base font-lato"
                onChange={(i) => handleTitle(i.target.value)}
              />
            </div>
            <div className="font-bold font-lato text-xl mb-2 mt-2 relative">
              <textarea
                type="text"
                placeholder="Subject"
                value={text}
                rows="2"
                maxLength="500"
                className="block w-full p-4 text-black border rounded-md bg-cream-color text-base font-lato resize-y"
                onChange={(i) => handleText(i.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4 ">
              <button
                type="button"
                className="text-white bg-red-800 hover:bg-red-400 font-bold font-lato rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="submit"
                className="text-white bg-first-blue hover:bg-second-blue font-bold font-lato rounded-md text-sm px-4 py-2.5 text-center me-0 mb-2"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
