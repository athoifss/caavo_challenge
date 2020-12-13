import React from "react";
import style from "./Header.module.css";

export default function Header(props) {
  return <div className={style.wrapper}>{props.title}</div>;
}
