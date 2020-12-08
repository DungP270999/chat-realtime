import React from 'react';
import propTypes from "prop-types";
import Main from "./Main/Main";
import Content from "./Content/Content";

const DashboardLayout = React.memo(({children}) => {
    return (
        <div className="wrapper min-vh-100">
            <Main>
                {/*<Navbar/>*/}
                <Content>
                    {children}
                </Content>
            </Main>
        </div>
    );
});

DashboardLayout.propTypes = {
    children: propTypes.any.isRequired
};

export default DashboardLayout;
