import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Header = () => {
  const LogoutHandler = async () => {
    await fetch(`http://localhost:8000/api/logout`, {
      method: "POST",

      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    swal({
      title: "Done",
      text: "Logged Out Successfully",
      icon: "success",
    });
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">
          Let's Toddle
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link
                action
                to="/createtodo"
                tag="a"
                className="nav-item nav-link active"
              >
                CreateTodo
              </Link>
            </li>

            <li class="nav-item">
              <Link
                action
                to="/showmytodos"
                tag="a"
                className="nav-item nav-link active"
                style={{ marginLeft: "10px" }}
              >
                My Todo
              </Link>
            </li>

            <li class="nav-item">
              <Link
                action
                to="/"
                tag="a"
                onClick={LogoutHandler}
                style={{ marginLeft: "1150px" }}
                className="nav-item nav-link  active"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
