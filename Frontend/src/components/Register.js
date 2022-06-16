import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Cardtitle,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Register() {
  let navigate = useNavigate();
  const [register, setRegister] = useState({});
  const RegisterHandler = (e) => {
    e.preventDefault();
    console.log(register);
    postdata(register);
    navigate("/");
  };

  const postdata = (data) => {
    axios
      .post(`http://localhost:8000/api/register`, data, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response);
          swal({
            title: "Done",
            text: "Registered Successfully",
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
      <div>
        <div style={{ marginTop: "100px", marginLeft: "35%" }}>
          <Card
            id="user"
            style={{
              width: "500px",
              minHeight: "400px",
              border: "5px solid",
              fontFamily: "cursive",
              backgroundColor: "rgba(255,255,255,0)",
            }}
          >
            <CardBody>
              <CardTitle>
                <h2 className="text-center">Register</h2>
              </CardTitle>
              <br />
              <br />
              <Form id="form">
                <FormGroup>
                  <Input
                    style={{
                      margin: "20px 0",
                      padding: "18px 20px",
                      border: "3px  black",
                    }}
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    onChange={(e) => {
                      setRegister({ ...register, name: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      margin: "20px 0",
                      padding: "18px 20px",
                      border: "3px  black",
                    }}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={(e) => {
                      setRegister({ ...register, email: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      margin: "20px 0",
                      padding: "18px 20px",
                      border: "3px  black",
                    }}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                    }}
                  />
                </FormGroup>

                <br />
                <Button onClick={RegisterHandler} color="success">
                  Register
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;
