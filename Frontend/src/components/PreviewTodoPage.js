import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import Header from "./Header";
import { ndescription, ntitle } from "./Todo";

function PreviewTodoPage() {
  let navigate = useNavigate();
  var title = ntitle;
  var description = ndescription;

  const updateHandler = () => {
    navigate("/updatetodo");
  };

  return (
    <>
      <Header />
      <Card
        body
        inverse
        style={{
          backgroundColor: "black",
          borderColor: "#333",
          marginTop: "250px",
          width: "500px",
          marginLeft: "480px",
          height: "200px",
        }}
      >
        <CardBody>
          <CardTitle tag="h3"> {title}</CardTitle>

          <CardText>Description: {description}</CardText>
          <br />
          <Button type="submit" onClick={updateHandler} color="primary">
            Edit
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default PreviewTodoPage;
