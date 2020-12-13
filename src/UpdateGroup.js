import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Context from "./util/Context";
import SweetAlert from "react-bootstrap-sweetalert";

import ImageUploader from "./ImageUploader";
import Header from "./Header";
import Checkbox from "@material-ui/core/Checkbox";

import style from "./AddGroup.module.css";
import { getRequest } from "./util/api";
import { GridOnSharp } from "@material-ui/icons";

export default function Container() {
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [groupLogo, setGroupLogo] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const context = useContext(Context);

  function handleAlert() {
    setIsAlert((prev) => !prev);
  }

  function handleChangeForm(e) {
    let currFormData = { ...formData };
    currFormData[e.target.name] = e.target.value;
    setFormData(currFormData);
  }

  function handleChangeCheckbox(id) {
    let newCheckedUsers = { ...checkedUsers };
    newCheckedUsers[id] = !newCheckedUsers[id];
    setCheckedUsers(newCheckedUsers);
  }

  function handleChangeGroupLogo(image) {
    setGroupLogo(image);
  }

  function handleRemoveImage() {
    setGroupLogo(null);
  }

  const history = useHistory();
  function handleSubmitClick() {
    if (!groupLogo) {
      handleAlert();
      return;
    }
    let userIdsToAdd = [];
    Object.entries(checkedUsers).map((item) => {
      if (item[1]) {
        userIdsToAdd.push(item[0]);
      }
    });

    let usersToAdd = [];
    users.forEach((item) => {
      if (userIdsToAdd.indexOf(item.id) !== -1) {
        usersToAdd.push(item);
      }
    });

    let data = {
      name: formData.groupName,
      img: groupLogo,
      desc: formData.groupDesc,
      users: usersToAdd,
    };
    context.updateGroup(data, id);
    history.push("/groups");
  }

  const { id } = useParams();
  useEffect(() => {
    let group = context.groups[id];
    let newCheckedUsers = {};
    group.users.forEach((item) => {
      newCheckedUsers[item.id] = true;
    });

    let currFormData = {
      groupName: group.name,
      groupDesc: group.desc,
    };

    setGroupLogo(group.img);
    setFormData(currFormData);
    setCheckedUsers(newCheckedUsers);
    setGroup(context.groups[id]);
    setUsers(context.groups[id].users);
  }, []);

  return (
    <div className={style.container}>
      {/* Alert for no image */}
      {isAlert ? (
        <SweetAlert
          confirmBtnStyle={{
            background: "#4f94e6",
            color: "white",
            width: "100px",
            textDecoration: "none",
            height: "40px",
            lineHeight: "40px",
            border: "none",
          }}
          title="Please select a group logo"
          onConfirm={handleAlert}
        />
      ) : null}
      <div className={style.wrapper}>
        <Header title="Update Group" />
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
            <form onChange={handleChangeForm}>
              <input type="text" name="groupName" value={formData.groupName} />
              <input type="text" name="groupDesc" value={formData.groupDesc} />
            </form>
            <button onClick={handleSubmitClick}>Submit</button>
          </div>
        </div>
        <div className={style.bottom}>
          {users.map((user) => {
            return (
              <div
                onClick={handleChangeCheckbox.bind(this, user.id)}
                key={user.id}
                className={style.userWrapper}
              >
                <Checkbox
                  checked={checkedUsers[user.id]}
                  onChange={handleChangeCheckbox.bind(this, user.id)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <div className={style.image}>
                  <img src={user.Image} alt="user" />
                </div>
                <div className={style.name}>{user.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
