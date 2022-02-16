import React from "react";
import { Link } from "react-router-dom";

//should return a unique navbar for every screen ***EXCEPT the home screen*** with a link to the home screen

export default function NavBar({ name, subname }) {
  return (
    <div className="d-flex align-items-center bg-light p-2">
      {!subname ? (
        <p className="mt-2">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / <span>{name}</span>
        </p>
      ) : (
        <p className="mt-2">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / <span>{name}</span> / <span>{subname}</span>
        </p>
      )}
    </div>
  );
}
