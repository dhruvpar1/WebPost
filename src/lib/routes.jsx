/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/layout/index';
import Dashboard from '../components/dashboard';
import Comment from '../components/comments';
import Profile from '../components/profile/Index';
import Users  from '../components/users/Index'

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id"
export const COMMENTS = "/protected/comments/:id"



export const router = createBrowserRouter([
    {path: ROOT, element: <Login />},
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Register />},
    {
        path: PROTECTED, 
        element:<Layout />,
        children: [
            {
                path:DASHBOARD,
                element: <Dashboard />
            },
            {
                path:USERS,
                element: <Users />
            },
            {
                path:PROFILE,
                element:<Profile />
            },
            {
                path:COMMENTS,
                element:<Comment />,
            },

        ],
     },
    
]);
