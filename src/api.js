import axios from "axios";
const baseUrl = "https://s3-ap-southeast-1.amazonaws.com/";

export const getRequest = (path) => {
  console.log(path);
  return axios.get(`${baseUrl}/${path}`);
};
