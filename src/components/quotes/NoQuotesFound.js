import { Link } from "react-router-dom";
import React from "react";
import classes from "./NoQuotesFound.module.css";

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No meals found!</p>
      <Link className="btn" to="/new-quote">
        Add Meal
      </Link>
    </div>
  );
};

export default NoQuotesFound;
