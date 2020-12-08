import React from 'react';

import {MDBBtn} from "mdbreact";

import Spinner from "./Spinner";

import styled from "styled-components";

import propTypes from "prop-types";

const StyledChildren = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
 span {
  &.hide {
  opacity: 0;
  }
  &.show {
  opacity: 1;
  }
 }
  
  .spinner-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonLoading = (props) => {
    const data = {...props};
    delete data["isLoading"];
    return (
        <MDBBtn
            {...data}
        >
            <StyledChildren>
                <span className={`${props.isLoading ? "hide" : "show"}`}>{props.children}</span>
                {
                    props.isLoading &&
                    <div className={"spinner-container"}>
                        <Spinner color="white"/>
                    </div>
                }
            </StyledChildren>
        </MDBBtn>
    );
};

ButtonLoading.propTypes = {
    isLoading: propTypes.bool
};

export default ButtonLoading;
