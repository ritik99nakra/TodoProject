import axios from "axios";
import React, { useState } from "react";
import { nid, ntitle, ndescription, ndate } from "./Todo";
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
import Header from "./Header";

const UpdateTodo = () => {
  let navigate = useNavigate();
  const [todo, setTodo] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(todo);
    updatemytodo(todo);
  };
  const updatemytodo = (todo) => {
    axios
      .put(`http://localhost:8000/updatetodo/${nid}`, todo, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          swal({
            title: "Done",
            text: " Task Updated Successfully",
            icon: "success",
          });

          navigate("/showmytodos");
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
            <Card className="border p-3" style={{ backgroundColor: "black" }}>
              <CardTitle style={{ fontFamily: "revert" }}>
                <h2>&nbsp;&nbsp;Update Task</h2>
              </CardTitle>
              <Form className="form">
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    defaultValue={ntitle}
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
                    defaultValue={ndescription}
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
                    defaultValue={ndate}
                    onChange={(e) => {
                      setTodo({ ...todo, date: e.target.value });
                    }}
                  />
                </FormGroup>
                <br />
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

export default UpdateTodo;
