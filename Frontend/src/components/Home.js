import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import CreateTodo from "./CreateTodo";
import ShowMyTodos from "./ShowMyTodos";

function Home() {
  return (
    <>
      <div>
        <ShowMyTodos />
      </div>
    </>
  );
}
export default Home;
