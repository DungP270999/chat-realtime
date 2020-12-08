import React from "react";

import {useSelector} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {auth as authRoutes, home as homeRoutes} from "./index";

import DashboardLayout from "../Components/Layouts/DashboardLayout";
import AuthLayout from "../Components/Layouts/AuthLayout";

const childRoutes = (Layout, routes, options) =>
    routes.map(({children, path: root_path, component: Component}, index) =>
        children ? (
            // Route item with children
            children.map(({path, component: Component}, index) => (
                <Route
                    key={index}
                    path={root_path + path}
                    exact
                    render={props => (
                        <Layout options={options}>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={root_path}
                exact
                render={props => (
                    <Layout options={options}>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );

const Routes = () => {
    const {user} = useSelector(state => ({user: state.user}));
    const isLogin = Boolean(user.authToken);

    return (
        <Router>
            <Switch>
                {
                    isLogin ?
                        childRoutes(DashboardLayout, homeRoutes)
                        :
                        childRoutes(AuthLayout, authRoutes)
                }
                <Route
                    render={() => <Redirect to={`${isLogin ? "/dashboard" : "/auth/sign-in"}`}/>}
                />
            </Switch>
        </Router>
    );
};

export default Routes;
