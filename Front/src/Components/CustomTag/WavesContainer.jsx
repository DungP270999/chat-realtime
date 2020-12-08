import React from "react";
import {MDBWaves} from "mdbreact";

import propTypes from "prop-types";

export default class WavesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorPos: {}
        };
    }

    handleClick = e => {
        e.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick();
        }
        let cursorPos = {
            top: e.clientY,
            left: e.clientX,
            time: Date.now() // time indicates particular clicks
        };
        this.setState({cursorPos: cursorPos});
    };

    render() {

        return (
            <div
                onMouseUp={this.handleClick}
                onTouchStart={this.handleClick}
                className={`position-relative ${this.props.className ?? ""}`}
            >
                {this.props.children}
                <MDBWaves
                    cursorPos={this.state.cursorPos}
                />
            </div>
        );
    }
}

WavesContainer.propTypes = {
    onClick: propTypes.func,
};
