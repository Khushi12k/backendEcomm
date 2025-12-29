import axios from "axios";
const instance=axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
export default instance;


// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// // 🔹 Add token automatically to all requests if it exists
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // get JWT from localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // attach token
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default instance;
