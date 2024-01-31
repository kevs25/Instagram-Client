
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://instagram-clone-techwithkev.koyeb.app/"

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(true);


  let navigate = useNavigate();

  const handleSignup = (event) => {
      if (!username || !email || !password) {
          setError("Please fill in all required fields.");
          setFormValid(false);
          return;
        }
    event.preventDefault();

    const json_string = JSON.stringify({
        username: username,
        email: email,
        password: password
  })
    const requestOptions = {
        method : 'POST',
        headers : {'content-type': 'application/json'},
        body: json_string
    }

    
    fetch(BASE_URL + 'user', requestOptions)
        .then(response => {
            const userdata = response.json();
            if (response.ok) {
                userdata.then(data => {
                    navigate("/", {state : data})
                })
                return userdata;
            }
            if (!response.ok) {
                if (response.status === 409){
                    userdata.then(error => {
                        setError(error.detail)
                    })
                }
                return;
            }
        })
        
        .catch(error => {
            console.log(error)
        })
  }
  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="text-center">
              <img
                src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png"
                style={{
                  objectFit: "contain",
                  width: "300px",
                  marginBottom: "30px",
                  
                }}
                alt=""
              />
            </div>
            <form>
              <div class="form-outline mb-4">
                <label class="form-label" for="form1Example13">
                  UserName
                </label>
                <input
                  type="text"
                  id="form1Example13"
                  class="form-control form-control-lg"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form1Example13">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  id="form1Example23"
                  class="form-control form-control-lg"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <button
                type="submit"
                onClick={handleSignup}
                class="btn btn-primary btn-lg btn-block"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
