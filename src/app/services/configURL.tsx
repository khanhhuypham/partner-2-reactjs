

import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { saveToken } from "../store/sessionManager";



const axiosClient = (port: number | null = null): AxiosInstance => {
    
    const headers = {"Content-Type": "application/json"}


    const client = axios.create({
        baseURL: `http://172.16.2.176:${(port ?? 31151).toString()}/api`,
        headers,
        timeout: 10000,
        withCredentials: false,
    });

    client.interceptors.request.use((config: any) => {

        localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyX25hbWUiOiJhYmMiLCJjb21wYW55X2lkIjoxLCJicmFuY2hfaWQiOjAsInVzZXJfaWQiOjc1MCwicGhvbmUiOiIwMTExMTExMTExIiwicHJpdmlsZWdlX2dyb3VwX2lkIjo1LCJwcml2aWxlZ2VfY29kZXMiOlsiQ1JFQVRFX1VTRVIiLCJVUERBVEVfVVNFUiJdLCJpYXQiOjE3Mjc2ODU2OTgsImV4cCI6MTc1OTIyMTY5OH0.SV_2tmGI3AHoKpIx2RndMg_IoQzskBmjolntYEuU-YE");
        const token = localStorage.getItem("token");
        console.log(token)
        config.headers = config.headers || {};
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });


    
    
    client.interceptors.response.use(
        (response: AxiosResponse) => { 
            return response;
        },
        (error: AxiosError) => {
            try {
                const { response } = error;
                
                if (response?.status === 401) {
                    localStorage.removeItem("ACCESS_TOKEN");
                }
                console.error(error);
            } catch (e) {
                console.error(e);
            }
            throw error;
        }
    );

    return client;
};

export default axiosClient;