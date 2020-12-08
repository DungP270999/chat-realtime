import React from "react";
import propTypes from "prop-types";

const Content = ({children}) => {
    return (
        <div className="content">
            {children}
        </div>
    );
};

Content.propTypes = {
    children: propTypes.any.isRequired
};

export default Content;
