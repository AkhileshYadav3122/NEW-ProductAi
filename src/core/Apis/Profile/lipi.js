import axios from "axios";

const headers = {
  client_key: "3G6XuF4cIEHh7o5zhUYGNmeK8FRSoPbU5sShkFCL",
  client_secret: "2m8aGC56EOHdRaZNbb6dy2lIJZxhMvP1rXzhnzDa4dEpKTb89f",
};

export const AdharFrontEnd = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/aadhar-extract-front/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const Adharback = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/aadhar-extract-back/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const Adharboth = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/aadhar-extract/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const panCard = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/pancard/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const drivingLiscene = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/driving-license/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const passportExtrct = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/passport-extract/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const invoiceExtract = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/invoice/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
// https://product.cloudstrats.ai/api/lipi/rcbook/

export const rcBookExtract = (data) => {
  return new Promise((resolve, reject) => {
    const url = "https://product.cloudstrats.ai/api/lipi/rcbook/";

    axios
      .post(url, data, { headers: headers })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
