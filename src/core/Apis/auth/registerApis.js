import Axios from "../../../axiosInterseptor";

export const registerAdd = (data) => {
  return new Promise((resolve, reject) => {
    const url = `register/`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const loginAdd = (data) => {
  return new Promise((resolve, reject) => {
    const url = `login/`;
    Axios.post(url, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
