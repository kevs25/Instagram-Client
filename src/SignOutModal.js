import Cookies from "js-cookie";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function SignOutModal() {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  const handleClose = (event) => {
    event.preventDefault();
    

    setShow(false);
    Cookies.remove('authToken');
    Cookies.remove('authTokenType');
    navigate("/");

  }

  const handleCancel = () => {
    setShow(false);
  }

  const handleShow = () => { 
    setShow(true);
  }

  return (
    <>
      <Button variant="primary" class="btn btn-light" style={{marginLeft:'10px'}} onClick={handleShow}>
        Logout
      </Button>

      <Modal
        show={show}
        onHide={(event) => handleClose(event)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <form>
            <p>Are you sure, you want to Logout ?</p>
            <button type="submit" onClick={handleCancel} class="btn btn-primary">
              Cancel
            </button>
            <button type="submit" onClick={handleClose} style={{marginLeft: '5px'}} class="btn btn-primary">
              Logout
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignOutModal;
