import Axios from "axios";


export const translate = (data) => {
    return new Promise ((resolve, reject) => {
        const url = 'https://product.cloudstrats.ai/api/akshar-ai/translate-text/';
        const headers = {
           "CLIENT-KEY":"3G6XuF4cIEHh7o5zhUYGNmeK8FRSoPbU5sShkFCL",
          "CLIENT-SECRET":"2m8aGC56EOHdRaZNbb6dy2lIJZxhMvP1rXzhnzDa4dEpKTb89f"
        }; 


        Axios.post(url,data, {headers:headers} )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    })
}


export const mictranslate = (data) => {
    return new Promise ((resolve, reject) => {
        const url = 'https://product.cloudstrats.ai/api/swar-ai/shrutlekh/';
        const headers = {
           "CLIENT-KEY":"3G6XuF4cIEHh7o5zhUYGNmeK8FRSoPbU5sShkFCL",
          "CLIENT-SECRET":"2m8aGC56EOHdRaZNbb6dy2lIJZxhMvP1rXzhnzDa4dEpKTb89f"
        }; 


        Axios.post(url,data, {headers:headers} )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    })
}