import React from 'react';

import Main from "./Main/Main";

const AuthLayout = ({children}) => (
    <React.Fragment>
        <Main className="d-flex w-100">
            {children}
        </Main>
    </React.Fragment>
);

export default AuthLayout;
