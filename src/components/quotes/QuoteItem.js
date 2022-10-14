import { Link } from "react-router-dom";
import React from "react";
import classes from "./QuoteItem.module.css";
import MealItemForm from "./MealItemForm";
import { deleteMeal } from "../../lib/api";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
const QuoteItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.props}>
      <figure className={classes.figure}>
        <h2>{props.name}</h2>
        <div className={classes.hi}>${props.price}</div>

        <Link to={`/quotes/${props.id}`}>
          <button className="btn"> View Fullscreen</button>{" "}
        </Link>
      </figure>
      <MealItemForm onAddToCart={addToCartHandler} />
      <button className={classes.click} onClick={() => deleteMeal(props.id)}>
        Delete{" "}
      </button>{" "}
    </li>
  );
};
export default QuoteItem;
