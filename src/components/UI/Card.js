import React from "react";
import "./Card.css";

export default function Card({ className, children }) {
  const classes = "card " + className;
  return <div className={classes}>{children}</div>;
}
