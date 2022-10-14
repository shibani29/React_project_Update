import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
const QuoteList = (props) => {
  const history = useHistory();
  return (
    <ul className={classes.list}>
      {props &&
        props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            description={quote.descriptioon}
            name={quote.name}
            price={quote.price}
            image={quote.image}
          />
        ))}
    </ul>
  );
};

export default QuoteList;
