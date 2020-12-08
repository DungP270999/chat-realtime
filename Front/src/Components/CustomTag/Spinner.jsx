import React from 'react';

import Proptypes from "prop-types";

import styled from "styled-components";

const mapSize = {
    "1x": "1rem",
    "2x": "2rem",
    "3x": "3rem",
    "4x": "4rem",
    "5x": "5rem",
    "sm": "0.875rem",
    "md": "0.975rem",
    "lg": "1.075rem",
    "xl": "1.175rem",
    "xxl": "1.275rem"
};

const mapSizeBorder = {
    "1x": "3px",
    "2x": "5px",
    "3x": "7px",
    "4x": "9px",
    "5x": "11px",
    "sm": "1px",
    "md": "1px",
    "lg": "1px",
    "xl": "1px",
    "xxl": "1px"
};

const StyledSpinner = styled.div`
  // display: inline-block;
  // position: relative;
  width: ${props => mapSize[props.size] ?? mapSize["1x"]};
  height: ${props => mapSize[props.size] ?? mapSize["1x"]};
  border-color: ${props => props.color} transparent;
  // div {
  //     box-sizing: border-box;
  //     display: block;
  //     position: absolute;
  //     width: ${props => mapSize[props.size] ?? mapSize["1x"]};
  //     height: ${props => mapSize[props.size] ?? mapSize["1x"]};
  //     margin: ${props => mapSizeBorder[props.size] ?? mapSizeBorder["1x"]};
  //     border: ${props => mapSizeBorder[props.size] ?? mapSizeBorder["1x"]} solid;
  //     border-radius: 50%;
  //     animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  //     border-color: ${props => props.color} transparent transparent transparent;
  //     &:nth-child(1) {
  //       animation-delay: -0.45s;
  //     }
  //    
  //     &:nth-child(2) {
  //       animation-delay: -0.3s;
  //     }
  //    
  //     &:nth-child(3) {
  //       animation-delay: -0.15s;
  //     }
  // }
  // @keyframes lds-ring {
  //     0% {
  //       transform: rotate(0deg);
  //     }
  //     100% {
  //       transform: rotate(360deg);
  //     }
  // }
`;

// const Spinner = (props) => {
//     return (
//         <StyledSpinner
//             className={`text-white ${props.className ?? ""}`}
//             role="status" size={props.size}
//             color={props.color}
//         >
//             <div/>
//             <div/>
//             <div/>
//             <div/>
//         </StyledSpinner>
//     );
// };

const Spinner = (props) => {
    return (
        <StyledSpinner
            className={`spinner-border text-white ${props.className ?? ""}`}
            role="status" size={props.size}
            color={props.color}
        >
            <span className="sr-only">Loading...</span>

        </StyledSpinner>
    );
};

Spinner.defaultProps = {
    size: "1x",
    color: "blue"
};

Spinner.propTypes = {
    size: Proptypes.oneOf(["1x", "2x", "3x", "4x", "5x", "sm", "md", "lg", "xl", "xxl"]),
    color: Proptypes.string,
    className: Proptypes.string
};

export default Spinner;
