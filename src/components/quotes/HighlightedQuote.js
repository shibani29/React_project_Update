import classes from "./HighlightedQuote.module.css";
import React from "react";
const HighlightedQuote = (props) => {
  return (
    <div>
      <figure className={classes.quote}>
        <div className={classes.hi}>
          {" "}
          <img src={props.image} alt={props.name} className={classes.meal} />
          <h1>{props.name}</h1>
          <figcaption>{props.description}</figcaption>
          <p>${props.price}</p>
        </div>
      </figure>
    </div>
  );
};

export default HighlightedQuote;
