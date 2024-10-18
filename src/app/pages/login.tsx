import React, { useEffect, useState } from "react";

import { setUser, userSelector } from "../store/userDataSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { selectGetToken } from "../selectors/tokenSelectors";
import { saveToken, getToken, getUser } from "../store/sessionManager";
import { useNavigate } from "react-router-dom";
import { showToast } from "../hooks/useToast";
import "react-toastify/dist/ReactToastify.css";

import { userService } from "../../app/services/user/userService";



const initialState = {
    company:"abc",
    phone:"0111111111",
    password:"000000"
}


const LoginForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    

    const userSlice = useAppSelector(userSelector);

    useEffect(() => {
        const user = getUser()
        console.log(user)
        // if (user === null) {

    
            // const storedToken = getToken();
            // if (storedToken !== null) {
            //     dispatch(storeToken(storedToken));
                navigate("/order");
            // }
        // }
    });


    const [formData,setFormData] = useState(initialState);


    
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
        userService.Login({ 
            identifier_name: formData.company,
            device_uuid: "b83d68bc-377b-45bf-a3e7-0d1d3d061730",
            phone: formData.phone,
            password: btoa(formData.password)
        }).then((res) => {
            
            console.log(btoa(formData.password))
            
            if (res && res.data?.status == 200) {
        
                dispatch(setUser(res.data.data))
                navigate("/order");
                showToast("success", "Login successful!");

            } else if (res && res.status === 400) {

                showToast(
                    "error",
                    "Login failed. Please check you email and password!"
                );

            } else {

                showToast("error", "Login failed!");

            }
         
        }).catch((err) => {
            showToast("error", "Login failed!");
        })


     
    };
   

    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold">
                            Login
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">

                            <input
        
                                required
                                className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Company name"
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                value={formData.company}
                            />

                            <input
                                type="tel"
                                required
                                className="relative block w-full border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Phone"
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                value={formData.phone}
                            />  
                            
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                value={formData.password}
                            />

                  
                        </div>

                        <div>
                            <button
                                type="submit"
                                className=" w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
