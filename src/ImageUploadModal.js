import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://instagram-clone-techwithkev.koyeb.app/";

export default function ImageUploadModal({ authToken, authTokenType, userId }) {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (!authToken || !authTokenType) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
      body: formData,
    };

    fetch(BASE_URL + "post/image", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const image_url = data.filename;
        CreatPost(image_url);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreatPost = (imageUrl) => {
    console.log("userid------------", userId);
    const json_string = JSON.stringify({
      image_url: imageUrl,
      image_url_type: "relative",
      caption: caption,
      creator_id: userId,
    });
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
        "Content-Type": "application/json",
      }),
      body: json_string,
    };
    fetch(BASE_URL + "post", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  }

  return (
    <>
      <Button
        variant="primary"
        class="btn btn-light btn-sm"
        onClick={handleShow}
      >
        Create Post
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <form>
            <div className="form-outline mt-4">
              <label className="form-label-font-size" htmlFor="form1Example13">
                Enter Caption for the Image
              </label>
              <input
                type="text"
                id="label"
                className="form-control form-control-md mt-2"
                placeholder="Caption"
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label for="formFile" className="form-label">
                Upload Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleChange}
              />
            </div>
            <button type="submit" onClick={handleCancel} class="btn btn-primary mt-2">
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleClose}
              class="btn btn-primary mt-2"
              style={{marginLeft : '5px'}}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
