import React, { useState, useEffect } from "react";
import style from "./Container.module.css";
import ImageUploader from "./ImageUploader";
import Header from "./Header";
import { getRequest } from "./api";

import Checkbox from "@material-ui/core/Checkbox";

export default function Container() {
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([{}]);
  const [groupLogo, setGroupLogo] = useState(null);

  function handleChange(id) {
    let newCheckedUsers = { ...checkedUsers };
    newCheckedUsers[id] = !newCheckedUsers[id];
    setCheckedUsers(newCheckedUsers);
    console.log(newCheckedUsers);
  }

  function handleChangeGroupLogo(image) {
    setGroupLogo(image);
  }

  function handleRemoveImage() {
    setGroupLogo(null);
  }

  useEffect(() => {
    getRequest("he-public-data/users49b8675.json").then((resp) => {
      let checkUsers = {};
      resp.data.forEach((item) => {
        checkUsers[item.id] = false;
      });
      setCheckedUsers(checkUsers);
      setUsers(resp.data);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <Header title="Create User" />
      <div className={style.top}>
        <div className={style.left}>
          <div className={style.uploaderWrapper}>
            <ImageUploader image={groupLogo} handleChange={handleChangeGroupLogo} />
            {groupLogo ? (
              <div onClick={handleRemoveImage} className={style.removeText}>
                Remove Image
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.right}>
          <form>
            <input type="text" name="groupName" placeholder="Group Name" />
            <input type="text" name="groupDesc" placeholder="Group Description" />
          </form>
        </div>
      </div>
      <div className={style.bottom}>
        {users.map((user) => {
          return (
            <div key={user.id} className={style.userWrapper}>
              <div className={style.image}>
                <img src={user.Image} alt="user" />
              </div>
              <div className={style.name}>{user.name}</div>
              <Checkbox
                checked={checkedUsers[user.id]}
                onChange={handleChange.bind(this, user.id)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
