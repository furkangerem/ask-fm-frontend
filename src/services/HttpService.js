export const PostWithAuth = (url, body) => {
  let request = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authToken"),
    },
    body: JSON.stringify(body),
  });
  return request;
};

export const PostWithoutAuth = (url, body) => {
  let request = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return request;
};

export const PutWithAuth = (url, body) => {
  let request = fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authToken"),
    },
    body: JSON.stringify(body),
  });
  return request;
};

export const GetWithAuth = (url) => {
  let request = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authToken"),
    },
  });
  return request;
};

export const DeleteWithAuth = (url) => {
  let request = fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authToken"),
    },
  });
  return request;
};

export const GetWithoutAuth = (url) => {
  let request = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request;
};
