import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const ImageUploader = (props) => {
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    let image = event.target.files[0];
    props.handleChange(image);
  };

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);
  return (
    <form
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {image ? (
        <>
          <img
            style={{ borderRadius: "10px", width: "100%", height: "100%" }}
            src={URL.createObjectURL(image)}
          />
        </>
      ) : (
        <>
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100% ",
              cursor: "pointer",
            }}
            htmlFor="imageId"
          >
            <AddCircleOutlineIcon />
          </label>
          <input
            style={{ display: "none" }}
            id="imageId"
            onChange={handleChange}
            type="file"
            name="image"
          />
        </>
      )}
    </form>
  );
};

export default ImageUploader;
