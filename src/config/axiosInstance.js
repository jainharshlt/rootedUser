"use client"
import axios from "axios";

const base_url  = "https://admin.rootedtoyou.com/api/"
const ImageUrl = "https://admin.rootedtoyou.com/storage/";
const shipping = 1500;
const gstRate = 5;
const axiosInstance = axios.create({
    baseURL: base_url,
});

axiosInstance.interceptors.request.use(
     (config) => {
         const token = localStorage.getItem('token');
         if (token) {
             config.headers['Authorization'] = `Bearer ${token}`;
         }
         return config;
     },
     (error) => {
         return Promise.reject(error);
     }
 );

axiosInstance.imageUrl = ImageUrl;
axiosInstance.shippingCharge = shipping;
axiosInstance.GSTRate = gstRate;
axiosInstance.baseUrls = base_url;

export default axiosInstance