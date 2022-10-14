import { Fragment, useState, useEffect } from "react";
import {
  useParams,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import React from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import classes from "../components/layout/HeaderCartButton.module.css";
import QuoteEditForm from "../components/quotes/QuoteEditForm";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const QuoteDetail = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  const { quoteId } = params;
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.name) {
    return <p>No meal found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        name={loadedQuote.name}
        description={loadedQuote.description}
        price={loadedQuote.price}
        image={loadedQuote.image}
      />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`}>
            <button className={classes.button}> Load Comments</button>{" "}
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
      <Route path={match.path} exact>
        <div className="centered">
          {isCheckout && <QuoteEditForm newinfo={quoteId} />}
          {!isCheckout && (
            <button className={classes.button} onClick={orderHandler}>
              Edit
            </button>
          )}
        </div>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
