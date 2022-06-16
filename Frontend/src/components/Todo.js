import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import swal from "sweetalert";

let ntitle = "";
let nid = 0;
let ndescription = "";
let ndate = "";

const Todo = ({ todos }) => {
  let navigate = useNavigate();
  const [today1, setToday1] = useState();

  useEffect(() => {
    ValidateDate();
  }, []);

  const ValidateDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    const newDate = new Date(today);
    setToday1(newDate);
    console.log(newDate);
  };

  const previewHandler = () => {
    ntitle = todos.title;
    nid = todos.id;
    ndescription = todos.task;
    ndate = todos.date;
    navigate("/previewtodopage");
  };

  const undoHandler = (event) => {
    let id = event.target.value;

    axios.put(`http://localhost:8000/updatestatus/${id}`).then(
      (response) => {
        ntitle = todos.title;
        nid = todos.id;
        ndescription = todos.task;
        ndate = todos.date;
        navigate("/updatetodo");
      },
      (error) => {
        swal({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        });
      }
    );
  };

  const doneHandler = (event) => {
    let id = event.target.value;

    axios.put(`http://localhost:8000/updatestatus/${id}`).then(
      (response) => {
        swal({
          title: "Done",
          text: "Status Updated  Successfully",
          icon: "success",
        });
      },
      (error) => {
        swal({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        });
      }
    );
  };

  const deleteHandler = (event) => {
    let id = event.target.value;

    axios.delete(`http://localhost:8000/delete/${id}`).then(
      (response) => {
        swal({
          title: "Done",
          text: " Task Deleted Successfully",
          icon: "success",
        });
      },
      (error) => {
        swal({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        });
      }
    );
  };
  var status1 = todos.status;
  var Expecteddate = todos.date;
  return (
    <tbody
      style={{ boxSizing: "inherit", margin: "10px 0", padding: "10px 50px" }}
    >
      <tr
        style={{
          fontSize: "25px",
          margin: "20px 0",
          padding: "18px 50px",
          fontFamily: "cursive",
          fontStyle: "bold",
        }}
      >
        {status1 && (
          <td
            style={{ backgroundColor: "green", textDecoration: "line-through" }}
          >
            {todos.title}
          </td>
        )}
        {!status1 && <td>{todos.title}</td>}
        {today1 < new Date(Expecteddate) ? (
          <td>{Expecteddate} </td>
        ) : (
          <td style={{ backgroundColor: "red", color: "whitesmoke" }}>
            "Expired"
          </td>
        )}
        <td style={{ textAlign: "right" }}>
          <Button
            style={{ textAlign: "right" }}
            type="submit"
            value={todos.id}
            onClick={deleteHandler}
            color="danger"
          >
            Delete
          </Button>
          <Button
            style={{ marginLeft: "10px", textAlign: "right" }}
            type="submit"
            onClick={previewHandler}
            color="warning"
          >
            Preview
          </Button>
          {today1 < new Date(Expecteddate) ? (
            <Button
              style={{ marginLeft: "10px", textAlign: "right" }}
              type="submit"
              value={todos.id}
              onClick={doneHandler}
              color="success"
            >
              Done
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "10px", textAlign: "right" }}
              type="submit"
              value={todos.id}
              onClick={undoHandler}
              color="secondary"
            >
              Undo
            </Button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Todo;
export { ntitle, ndescription, nid, ndate };
