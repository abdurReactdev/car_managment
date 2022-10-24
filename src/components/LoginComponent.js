import React,{ useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function LoginComponent() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const navigate = useNavigate();
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')
  return (
    <div className="loginContainer">
      <div>
        <div className="formContainer pt-4 pb-4 px-4 rounded">
          <h1 className="display-3">Login</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              users.forEach(element => {
                if (username === element.username && password === element.password) {
                  localStorage.setItem("token", "4554355454353534555354554");
                  dispatch({ type: "Set_Token", payload: "4554355454353534555354554" });

                  navigate("/home", { replace: true });
                  return;
                }
              });

            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={username} placeholder="Enter username" required onChange={
                (e) => {
                  setUsername(e.target.value)
                }
              }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} name="password" placeholder="Password" required  onChange={
                (e) => {
                  setPassword(e.target.value)
                }
              }/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
