import React, { useState, useEffect, useContext } from "react";

import Header from "./Header";
import style from "./ViewGroups.module.css";
import Context from "./util/Context";

export default function Container() {
  const context = useContext(Context);

  useEffect(() => {
    console.log(context);
  }, [context]);

  return (
    <div className={style.wrapper}>
      <Header title="View Groups" />
      {context.groups.length !== 0 ? (
        <>
          {context.groups.map((group, i) => {
            {
              return group.users.map((user) => {
                return <div key={user.id}>{user.name}</div>;
              });
            }
          })}
        </>
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
}
