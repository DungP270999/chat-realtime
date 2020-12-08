import Dashboard from "../Pages/Dashboard/Dashboard";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";

const homeRoutes = {
    path: "/dashboard",
    name: "Home",
    component: Dashboard
    // children: [
    //     {
    //         path: "/dashboard",
    //         name: "Dashboard",
    //         component: Dashboard
    //     }
    // ]
};

const authRoutes = {
    path: "/auth",
    name: "Auth",
    children: [
        {
            path: "/sign-in",
            name: "Sign In",
            component: SignIn
        },
        {
            path: "/sign-up",
            name: "Sign Up",
            component: SignUp
        }
    ]
};

export const home = [
    homeRoutes
];

export const auth = [
    authRoutes
];
