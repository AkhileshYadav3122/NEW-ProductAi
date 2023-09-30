import Axios from "axios";

export const writing = (data) => {
   return new Promise((resolve, reject) => {
     const url = "https://product.cloudstrats.ai/api/akshar-ai/content-writting/";
     const headers = {
        "CLIENT-KEY":"3G6XuF4cIEHh7o5zhUYGNmeK8FRSoPbU5sShkFCL",
           "CLIENT-SECRET":"2m8aGC56EOHdRaZNbb6dy2lIJZxhMvP1rXzhnzDa4dEpKTb89f"
     };
     
    Axios.post(url, data, {headers:headers})
    .then((response) => resolve(response))
    .catch((error) => reject(error))

   })
} 