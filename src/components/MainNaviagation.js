import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import img from "../logo2.webp";

export const MainNaviagation = () => {
  return (
    <header className={classes.header}>
      <img alt="logo" src={img} className={classes.img} />
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add Expense
            </NavLink>
          </li>
          <li>
            <NavLink
              to="summary"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Summary
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
