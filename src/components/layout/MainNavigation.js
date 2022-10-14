import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li>
            <NavLink to="/quotes" activeClassName={classes.active}>
              <button className="btn"> All Meals </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={classes.active}>
              <button className="btn"> Add a Meal </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
