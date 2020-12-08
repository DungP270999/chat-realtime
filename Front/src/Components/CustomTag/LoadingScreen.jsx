import React, {Component} from 'react';
import propTypes from "prop-types";
import styled from "styled-components";

const StyledLoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: indigo;
  z-index: 9999;
  span {
    animation: bounce 1s infinite;
  }
`;

class LoadingScreen extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextProps.isOpen !== this.props.isOpen
        )
    }

    render() {
        return (
            <StyledLoadingScreen
                className={`${this.props.isOpen ? "d-flex" : "d-none"} justify-content-center align-items-center`}>
                <span className="text-white font-size-3x">
                    Loading
                </span>
            </StyledLoadingScreen>
        );
    }
}

LoadingScreen.propTypes = {
    isOpen: propTypes.bool
};

export default LoadingScreen;
