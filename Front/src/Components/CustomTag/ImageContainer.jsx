import React, {Component} from 'react';

import styled from "styled-components";
import propTypes from "prop-types";
import {MDBMask, MDBView} from "mdbreact";
import Spinner from "./Spinner";

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  > div {
    padding-bottom: ${props => {
    switch (props.ratio) {
        case "16:9":
            return "56.2%";
        case "3:2":
            return "66.67%";
        case "4:3":
            return "75%";
        case "1:1":
            return "100%";
        default:
            return "56.2%";
    }
}};
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .layer-mask {
      opacity: .4;
    }
  }
`;

class ImageContainer extends Component {
    isHasDraft() {
        return (this.props.draft && !this.props.src);
    }

    render() {
        return (
            <StyledImageContainer
                className={this.props.className ? this.props.className : ""}
                ratio={this.props.ratio}
                onClick={() => {
                    if (this.props.onClick)
                        this.props.onClick()
                }}
            >
                <MDBView>
                    <img
                        src={
                            this.isHasDraft() ?
                                this.props.draft ? this.props.draft : "/img/banner/placeholder.png"
                                :
                                this.props.src ? this.props.src : "/img/banner/placeholder.png"
                        }
                        alt={this.props.alt}
                    />
                    {
                        this.isHasDraft() &&
                        <>
                            <MDBMask className="bg-dark layer-mask w-100 h-100">

                            </MDBMask>
                            <MDBMask className="d-flex w-100 h-100 justify-content-center align-items-center">
                                <Spinner size="2x"/>
                            </MDBMask>
                        </>
                    }
                </MDBView>
            </StyledImageContainer>
        );
    }
}

ImageContainer.defaultProps = {
    ratio: "16:9"
};

ImageContainer.propTypes = {
    ratio: propTypes.oneOf(["16:9", "4:3", "3:2", "1:1"]),
    src: propTypes.any,
    draft: propTypes.any,
    alt: propTypes.string.isRequired,
    className: propTypes.string
};

export default ImageContainer;
