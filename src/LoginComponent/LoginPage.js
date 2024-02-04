import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './LoginPage.css'

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://instagram-clone-techwithkev.koyeb.app/"

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(true);

  const locationData = useLocation();
  useEffect(() => {

    // console.log("username",locationData.state.username)
    if (locationData.state && locationData.state.username){

      setUsername(locationData.state.username);
    }
  }, [locationData.state])
  

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const authTokenType = Cookies.get("authTokenType");

    if (authToken && authTokenType) {
      setAuthToken(authToken);
      setAuthTokenType(authTokenType);
    }
  }, [authToken, authTokenType]);

  let navigate = useNavigate();

  const handleLogin = async (event) => {
    if (!username || !password) {
      setError("Please fill in all required fields.");
      setFormValid(false);
      return;
    }
    event.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(BASE_URL + "login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError(
            "Invalid credentials. User does not exist"
          );
          navigate("/");
        }
        else if(response.status === 401){
          setError(
            "Incorrect Password"
          );
          navigate("/");
        }
        return;
      }

      const data = await response.json();
      Cookies.set("authToken", data.access_token);
      Cookies.set("authTokenType", data.token_type);
      setAuthToken(data.access_token);
      setAuthTokenType(data.token_type);
      setUserId(data.user_id);
      setUsername(data.username);
      navigate("/App", {state : { userId: data.user_id, username: data.username }});
    } catch (error) {
      console.log(error);
    }
  };

  const gotoSignup = (event) => {
    event.preventDefault();
    navigate("/SignUpPage");
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div className="text-center">
                <img
                  src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png"
                  style={{
                    objectFit: "contain",
                    width: "240px",
                    marginBottom: "30px",
                    marginRight : "50px"
                  }}
                  alt=""
                />
              </div>
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">
                    UserName
                  </label>
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    value={username}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
                <div className="mt-2">
                  <button type="submit" className="border-0 bg-white" onClick={gotoSignup}>
                    Don't have an account? Create here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
