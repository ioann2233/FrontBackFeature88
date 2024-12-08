import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";

export const privateRoutes = [
    {path: '/home', component: Home},
]

export const publicRoutes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
]