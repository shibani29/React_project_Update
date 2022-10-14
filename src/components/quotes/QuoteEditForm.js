import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const isPrice = (value) => value.trim == "" || value > 0;
const isImage = (value) => value.trim == "" || value.includes(".jpg");
const isEmpty = (value) => value.trim() === "";
const QuoteEditForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    image: true,
    price: true,
    description: true,
  });
  const descriptionInputRef = useRef();
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const imageInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
  }
  async function editMeal(id) {
    event.preventDefault();

    const enteredDescription = descriptionInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredImageIsValid = isImage(enteredImage);
    const enteredPriceIsValid = isPrice(enteredPrice);
    const enteredDescriptonIsValid = !isEmpty(enteredDescription);

    setFormInputsValidity({
      name: enteredNameIsValid,
      image: enteredImageIsValid,
      price: enteredPriceIsValid,
      description: enteredDescriptonIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredImageIsValid &&
      enteredPriceIsValid &&
      enteredDescriptonIsValid;

    if (!formIsValid) {
      return;
    }
    const moneky = {
      name: enteredName,
      description: enteredDescription,
      image: enteredImage,
      price: enteredPrice,
    };
    confirm("Do you want to edit?");
    const response = await fetch(
      `https://react-hooks-2453f-default-rtdb.firebaseio.com/meal/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(moneky),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not edut meal.");
    }
    if (response.ok) {
      window.location.reload();
    }
  }
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const imageControlClasses = `${classes.control} ${
    formInputsValidity.image ? "" : classes.invalid
  }`;
  const priceControlClasses = `${classes.control} ${
    formInputsValidity.price ? "" : classes.invalid
  }`;
  const descriptionControlClasses = `${classes.control} ${
    formInputsValidity.description ? "" : classes.invalid
  }`;
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <div>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={editMeal}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            {" "}
            <div className={nameControlClasses}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" ref={nameInputRef} />
              {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={imageControlClasses}>
              <label htmlFor="name">Image</label>
              <input type="text" id="image" ref={imageInputRef} />
              {!formInputsValidity.image && <p>Please enter a valid image!</p>}
            </div>
            <div className={descriptionControlClasses}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="5"
                ref={descriptionInputRef}
              ></textarea>{" "}
              {!formInputsValidity.description && (
                <p>Please enter a valid description!</p>
              )}
            </div>
            <div className={priceControlClasses}>
              <label htmlFor="price">Price</label>
              <input type="text" id="price" ref={priceInputRef} />
              {!formInputsValidity.price && <p>Please enter a valid price!</p>}
            </div>
            <div className={classes.actions}>
              <button onClick={() => editMeal(props.newinfo)} className="btn">
                Edit Meal
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default QuoteEditForm;
