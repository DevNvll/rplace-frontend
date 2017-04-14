import React from "react";
import { Link } from "react-router-dom";

const Success = () => (
  <div>
    <h1>
      Successfully registered. <Link to="/login">Click here to login</Link>
    </h1>
  </div>
);

export default Success;
