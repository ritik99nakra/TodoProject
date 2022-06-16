import axios from "axios";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { Table } from "reactstrap";
import Header from "./Header";
import { Button } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";

const ShowMyTodos = () => {
  let navigate = useNavigate();
  const createTodoHandler = () => {
    navigate("/createtodo");
  };
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/showmytodos`, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);

          setTodos(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );
  }, [todos]);
  return (
    <>
      <Header />
      <Button
        onClick={createTodoHandler}
        style={{ marginTop: "100px", textAlign: "center" }}
        color="primary"
      >
        + Add Task
      </Button>
      <br />
      <br />
      <Table
        hover
        borderless
        striped
        style={{
          width: "1200px",
          marginTop: "50px",
          marginLeft: "200px",
        }}
      >
        <thead>
          <tr
            style={{
              fontSize: "25px",
              margin: "20px 0",
              padding: "18px 50px",
              fontFamily: "cursive",
              fontStyle: "bold",
            }}
          >
            <th>Title</th>
            <th>DeadLine</th>
            <th>Action</th>
          </tr>
        </thead>
        {todos.length > 0
          ? todos.map((item) => <Todo key={item.id} todos={item} />)
          : "no todos available"}
      </Table>
    </>
  );
};

export default ShowMyTodos;
