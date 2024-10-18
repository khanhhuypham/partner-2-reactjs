import {  removeUser, userSelector } from "../store/userDataSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { removeSessionToken } from "../store/sessionManager";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";



const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userSlice = useAppSelector(userSelector);

    const effectRun = useRef(false);

    const handleLogoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(removeUser());
        navigate("/");
    };

    useEffect(() => {

        console.log(userSlice.user)

        if (!effectRun.current) {
            // const userDetails = async () => {
            //     const res = await getUserData();
            //     setFirstNameLastName(
            //         res.data.data.FirstName + " " + res.data.data.LastName
            //     );
            // };
            // userDetails();
        }

        return () => {
            effectRun.current = true;
        };

    }, []);

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Wellcome {userSlice.user?.name}
                    </h3>
                    <h4>You have successfully logged in!</h4>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogoutSubmit}>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Logout;
