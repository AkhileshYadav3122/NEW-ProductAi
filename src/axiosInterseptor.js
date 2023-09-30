import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create({  
  baseURL: "https://productuser.cloudstrats.ai:4443/api"  // local server
});
 
axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token"); // access token
    const refresh_token = localStorage.getItem("refresh_token"); // refresh token
    const user = localStorage.getItem("user_id");

    if (access_token) {
      const { exp } = jwt_decode(access_token);

      if (Date.now() >= exp * 1000000) {
        if (refresh_token) {
          window.location.href = "/login";
          // try {
          //   const response = await axios.post(
          //     'http://localhost:3000/v1/auth/refresh-tokens', // refresh token URL
          //     { refresh: refresh_token }
          //   );
          //   localStorage.setItem('access_token', response.data.access);
          //   localStorage.setItem('refresh_token', response.data.refresh);
          //   config.headers['Authorization'] = `Bearer ${response.data.access}`;
          // } catch (err) {
          //   console.log(err);
          // }
        }
      } if (!user) {
        window.location.href = "/login";
        console.log("user not valid");
      }
      else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Handle any errors from the response
    if (error.response && error.response.status === 401) {
      // Redirect to login page if user is not authorized
      // window.location.href = "/login";
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
