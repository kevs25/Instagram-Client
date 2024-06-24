import "./App.css";
import { useEffect, useState } from "react";
import Post from "./PostComponent/Post";
import SignOutModal from "./SignOutModal";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploadModal from "./ImageUploadModal";

function App() {
  let navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const authTokenType = Cookies.get("authTokenType");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!authToken || !authTokenType) {
      navigate("/");
    }
  });

  let locationData = useLocation();
  useEffect(() => {
    if (locationData.state && locationData.state.userId) {
      setUserId(locationData.state.userId);
    }
    if (locationData.state && locationData.state.username) {
      setUsername(locationData.state.username);
    }
  }, [locationData.state]);
  console.log("useranem-", username);

  // const BASE_URL = "http://localhost:8000/";
  const BASE_URL = "https://instagram-client.netlify.app/";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "post/all");
        const result = await response.json();
        result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <img
          className="app-image"
          src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png"
          alt=""
        />
        <div>
          <ImageUploadModal
            authToken={authToken}
            authTokenType={authTokenType}
            userId={userId}
          />
          <SignOutModal />
        </div>
      </div>

      <div className="app-post">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              authToken={authToken}
              authTokenType={authTokenType}
              username={username}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
