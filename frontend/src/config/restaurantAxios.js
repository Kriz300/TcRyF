//Basic imports
import axios from "axios";

//Axios instance to connect with backend
const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 5000
});

export default axiosInstance;