import React, { useEffect, useState } from "react";
import "./Post.css";
import { FaUser } from "react-icons/fa";

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://instagram-clone-techwithkev.koyeb.app/"

export default function Post({ post, authToken, authTokenType, username }) {
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(BASE_URL + post.image_url);
    }
  }, [post.image_url, post.image_url_type]);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const handleDelete = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "Delete",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
    };

    fetch(BASE_URL + "post/delete/" + post.id, requestOptions)
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
        throw response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComment = (event) => {
    event.preventDefault();

    const json_string = JSON.stringify({
      'username' : username,
      'text': newComment,
      'post_id' : post.id
    })

    const requestOptions = {
      method : 'POST',
      headers : new Headers({
        'Authorization': authTokenType + ' ' + authToken,
        'Content-Type' : 'Application/json'
      }),
      body : json_string     
    }

    fetch(BASE_URL + 'comment', requestOptions)
      .then(response =>{
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        fetchComments()
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() =>{
        setNewComment('')
      })
  };

  const fetchComments = () => {
    fetch(BASE_URL + 'comment/all/' + post.id)
      .then(response =>{
        if(response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        setComments(data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  

  return (
    <div className="post">
      <div className="post-header">
        <FaUser size={30} color="lightgrey" />
        <div className="post-headerinfo">
          <h3>{post.user.username}</h3>
          <button className="post-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <img className="post-image" src={imageUrl} alt="" />
      <h4 className="post-text">{post.caption}</h4>
      <div className="post-comment">
        {comments?.map((comment, index) => {
          return (
            <p key={index}>
              <strong>{comment?.username}:</strong> {comment?.text}
            </p>
          );
        })}
      </div>
      <div className="p-2">
        <form
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <input
            type="text"
            id="form1Example13"
            className="form-control form-control-md"
            placeholder="Add a comment"
            onChange={(e) => setNewComment(e.target.value)}
            required
            value={newComment}
            style={{ marginRight: "5px" }}
          />
          <button
            type="submit"
            onClick={handleComment}
            className="btn btn-primary btn-sm btn-block"
            disabled={!newComment}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
