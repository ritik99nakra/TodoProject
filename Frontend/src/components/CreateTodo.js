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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "./Header";

const CreateTodo = () => {
  let navigate = useNavigate();
  const [todo, setTodo] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(todo);
    createmytodo(todo);
    navigate("/showmytodos");
  };
  const createmytodo = (todo) => {
    axios
      .post(`http://localhost:8000/createtodo`, todo, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          swal({
            title: "Done",
            text: "New Task Added Successfully",
            icon: "success",
          });

          setTodo(response.todo);
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
    <>
      <Header />
      <div>
        <div
          className="align-items-center "
          style={{
            width: "30%",
            textAlign: "center",
            marginTop: "185px",
            marginLeft: "35%",
          }}
        >
          <div className="Login" style={{ border: "3px solid white" }}>
            <Card
              className="border p-3"
              style={{ backgroundColor: "rgba(255,255,255,0)" }}
            >
              <CardTitle style={{ fontFamily: "revert" }}>
                <h2>&nbsp;&nbsp;Create Task</h2>
              </CardTitle>
              <br />
              <Form className="form">
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={(e) => {
                      setTodo({ ...todo, title: e.target.value });
                    }}
                  />
                </FormGroup>
                <br />

                <FormGroup>
                  <Input
                    type="text"
                    name="task"
                    id="task"
                    placeholder="Description"
                    onChange={(e) => {
                      setTodo({ ...todo, task: e.target.value });
                    }}
                  />
                </FormGroup>
                <br />
                <FormGroup>
                  <Input
                    type="text"
                    name="date"
                    id="date"
                    placeholder="yyyy-mm-dd"
                    onChange={(e) => {
                      setTodo({ ...todo, date: e.target.value });
                    }}
                  />
                </FormGroup>
                <br />
                <Button type="submit" color="success" onClick={submitHandler}>
                  Submit
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
