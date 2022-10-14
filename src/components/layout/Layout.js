import { Fragment } from "react";
import React from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import mealsImage from "../../assets/meals.jpg";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
