import React from 'react';
import propTypes from 'prop-types';

const Main = React.memo(({children}) => {
    return (
        <div className="main">
            {children}
        </div>
    );
});

Main.propTypes = {
    children: propTypes.any.isRequired
};

export default Main;
