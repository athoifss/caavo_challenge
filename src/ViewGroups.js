import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import style from "./ViewGroups.module.css";
import Context from "./util/Context";

export default function Container() {
  const context = useContext(Context);
  const history = useHistory();

  function handleClickGroup(id) {
    history.push(`/group/${id}`);
  }

  function handleAddGroup() {
    history.push("/group/add");
  }

  useEffect(() => {
    console.log(context);
  }, [context]);

  return (
    <div className={style.wrapper}>
      <button onClick={handleAddGroup} className={style.addButton}>
        Add A Group
      </button>
      <Header title="View Groups" />
      {context.groups.length !== 0 ? (
        <div className={style.groups}>
          {context.groups.map((group, i) => {
            return (
              <div onClick={handleClickGroup.bind(this, i)} className={style.groupWrapper} key={i}>
                <div className={style.imageContainer}>
                  <img src={URL.createObjectURL(group.img)} />
                </div>
                <div>{group.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={style.nothingText}>Nothing to show. Please add a group to view groups </div>
      )}
    </div>
  );
}
