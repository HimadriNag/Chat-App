import axios from "axios";


const getApiUrl = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  
  if (isLocalhost) {
    return "http://localhost:5000/api";
  } else {
    
    return `http://${hostname}:5000/api`;
  }
};

export const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});


console.log("API URL:", getApiUrl());
