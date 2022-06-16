import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Cardtitle,
  Card,
  CardTitle,
} from "reactstrap";
import swal from "sweetalert";

function Login() {
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const registerHandler = () => {
    navigate("/register");
  };
  const LoginHandler = (e) => {
    e.preventDefault();
    console.log(user);
    postdata(user);
  };

  const postdata = (data) => {
    axios
      .post(`http://localhost:8000/api/login`, data, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response);
          navigate("/home");
          swal({
            title: "Done",
            text: "Logged In Successfully",
            icon: "success",
          });
        },
        (error) => {
          console.log(error);
          swal({
            title: "Error",
            text: "Something Went Wrong",
            icon: "error",
          });
        }
      );
  };

  return (
    <div>
      <div
        className="align-items-center "
        style={{
          width: "25%",
          textAlign: "center",
          marginTop: "185px",
          marginLeft: "35%",
          minHeight: "30%",
        }}
      >
        <div
          className="Login"
          style={{ border: "3px solid", background: "rgba(255,255,255,0)" }}
        >
          <Card
            className="border p-3"
            style={{ backgroundColor: "rgba(255,255,255,0)" }}
            // style={{minHeight:"80%"}}
          >
            <CardTitle style={{ fontFamily: "cursive" }}>
              <h2>&nbsp;&nbsp;Login</h2>
            </CardTitle>
            <br />
            <Form className="form">
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </FormGroup>
              <br />
              <Button type="submit" color="success" onClick={LoginHandler}>
                Login
              </Button>
              <Button
                onClick={registerHandler}
                id="btn"
                color="primary"
                style={{ marginLeft: "15px" }}
              >
                Register
              </Button>

              <br />
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
