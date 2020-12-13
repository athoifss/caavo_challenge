import React, { useState, useEffect } from "react";
import style from "./Container.module.css";
import { getRequest } from "./api";

export default function Container() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getRequest("he-public-data/users49b8675.json").then((resp) => {
      console.log(resp.data);
      setUsers(resp.data);
    });
  });

  return (
    <div className={style.wrapper}>
      <div className="top">
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="bottom">
        {users.map((user) => {
          return (
            <div key={user.id} className={style.userWrapper}>
              <div className={style.top}>
                <img src={user.Image} alt="user" />
              </div>
              <div className={style.bottom}>{user.Name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
