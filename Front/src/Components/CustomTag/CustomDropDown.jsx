import React, {useEffect, useRef} from 'react';
import propTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";

import styled from "styled-components";

const StyledCustomDropDown = styled.div`
  position: relative;
  .custom-dropdown-menu {
    position: absolute;
    background-color: white;
    visibility: hidden;
    &.open {
      visibility: visible;
    }
  }
  
  &.drop-up {
    .custom-dropdown-menu {
      bottom: 0;
    }
  }
  
  &.drop-down {
    .custom-dropdown-menu {
      top: 0;
    }
  }
  
  &.drop-left {
    .custom-dropdown-menu {
      right: 0;
     }
  }
  
  &.drop-right {
    .custom-dropdown-menu {
      left: 0;
    }
  }
`;

export const CustomDropdown = (props) => {

    const ref = useRef(null);

    useEffect(() => {

    }, [])

    function getClassName() {
        switch (props.direction) {
            case "top":
                return "drop-up";
            case "bottom":
                return "drop-down";
            case "left":
                return "drop-left";
            case "right":
                return "drop-right";
            case "top-left":
                return "drop-up drop-left";
            case "top-right":
                return "drop-up drop-right";
            case "bottom-left":
                return "drop-down drop-left";
            case "bottom-right":
                return "drop-down drop-right";
            default:
                return "drop-down"
        }
    }

    // function getTransform() {
    //     console.log(ref.current);
    //     return "";
    // }

    return (
        <StyledCustomDropDown
            className={getClassName()}
            ref={ref}
            // style={{transform: getTransform()}}
        >
            {props.children}
        </StyledCustomDropDown>
    );
};

CustomDropdown.defaultProps = {
    direction: "bottom"
};

CustomDropdown.propTypes = {
    children: propTypes.node.isRequired,
    direction: propTypes.oneOf(["top", "left", "bottom", "right", "top-left", "top-right", "bottom-left", "bottom-right"])
};


/*-------------------------------------------------------*/
export const CustomDropdownToggle = (props) => {

    const ref = useRef(null);

    function toggle() {
        if (ref) {
            if (ref.current) {
                if (ref.current.nextElementSibling) {
                    ref.current.nextElementSibling.classList.add("open");
                }
            }
        }
    }

    return (
        <div ref={ref} className="custom-dropdown-toggle" onClick={toggle}>
            {props.children}
        </div>
    );
};

CustomDropdownToggle.defaultProps = {};

CustomDropdownToggle.propTypes = {
    children: propTypes.node.isRequired,
};

/*-------------------------------------------------------*/
export const CustomDropdownMenu = (props) => {
    return (
        <div className="custom-dropdown-menu">
            {props.children}
        </div>
    );
};

CustomDropdownMenu.defaultProps = {};

CustomDropdownMenu.propTypes = {
    children: propTypes.node.isRequired,
};

/*-------------------------------------------------------*/
export const CustomDropdownItem = (props) => {
    const ref = useRef(null);

    // function handleSelect() {
    //     if (ref) {
    //         if (ref.current) {
    //             if (ref.current.parentNode) {
    //                 ref.current.parentNode.classList.remove("open");
    //             }
    //         }
    //     }
    // }

    function handleClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <MenuItem ref={ref} className="custom-dropdown-item" onClick={handleClick}>
            {props.children}
        </MenuItem>
    );
};

CustomDropdownItem.defaultProps = {};

CustomDropdownItem.propTypes = {
    children: propTypes.node.isRequired,
};
