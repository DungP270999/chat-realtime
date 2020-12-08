import React from 'react';

import {MDBBadge, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput} from "mdbreact";

import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";

import styled from "styled-components";
import PropsTypes from "prop-types"

import Alert from "../../Utils/Notify/Alert";

import {deepCompareObj} from "../../Utils";

const StyledInputTag = styled.div`
  flex-wrap: wrap;
  
  background: white;
 
  padding-top: .6rem;
  .input-container {
   
    position: relative;
  
    display: flex;
    align-items: center;
    cursor: text;
    border-bottom: 1px solid #ced4da;
    
    label {
        font-size: 1rem;
        margin: 0;
        color: #757575;
        position: absolute;
        top: -1rem;
        left: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    
    input {
     
      border: none !important;
      &:focus {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
      }
      
      width: 100px;
    }
  
    &:focus-within {
      border-bottom: 1px solid #4285f4;
    }
  }
`;

export class InputTag extends React.Component {

    constructor(props) {
        super(props);
        this.maxCharacter = this.props.maxCharacter;
        this.maxLength = this.props.maxLength;
        this.randomId = Math.round(Math.random() * 1000).toString();
        this.state = {
            data: this.props.data ?? [],
            text: ""
        }
    }

    /* Life circle */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!deepCompareObj(prevState.data, this.state.data)) {
            this.props.onChange(this.state.data);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!deepCompareObj(nextProps.data, this.props.data)) {
            this.setState({data: nextProps.data})
        }
    }

    /*-------------------------------------------------------*/

    /* Input change */
    handleChange(event) {
        this.setState({text: event.target.value});
    };

    /* Key enter event */
    handleKeyUp(event) {
        if (event.key === "Enter") {
            this.handleAddData()
        }
    };

    /* Add tag */
    handleAddData() {
        let text = this.state.text;
        if (text === "") {
            return;
        }
        if (text.trim() === "") {
            this.setState({text: ""});
            return;
        }
        if (text.length > this.maxCharacter) {
            Alert.alert(`Length [1-${this.maxCharacter}]`);
            return;
        }
        this.setState(prev => (
            {
                data: [
                    ...prev.data,
                    text
                ],
                text: ""
            }
        ));

    };

    /* Remove tag */
    handleRemove(index) {
        let data = JSON.parse(JSON.stringify(this.state.data));
        data.splice(index, 1);
        this.setState({data});
    };

    render() {
        return (
            <StyledInputTag
                className={`md-form ${this.props.containerClass ?? ""}`}
                style={this.props.containerStyle ?? {}}
                onClick={() => document.getElementById(`input-${this.randomId}`).focus()}
            >
                <div className="input-container flex-wrap">
                    {
                        this.state.data.map((d, i) => (
                            <MDBBadge
                                key={i}
                                className={`mx-1 my-1 no-shadow ${this.props.badgeClass ?? ""}`}
                                style={this.props.badgeStyle ?? {}}
                            >
                                {d}
                                <span className="ml-2 hover-pointer" onClick={this.handleRemove.bind(this, i)}>
                            X
                        </span>
                            </MDBBadge>
                        ))

                    }
                    <input
                        id={`input-${this.randomId}`}
                        maxLength={this.maxCharacter}
                        name={"text"}
                        value={this.state.text}
                        onChange={this.handleChange.bind(this)}
                        onKeyUp={this.handleKeyUp.bind(this)}
                        onBlur={this.handleAddData.bind(this)}
                        style={this.props.inputStyle ?? {}}
                        className={this.props.inputClass}
                        autoComplete="off"
                    />
                    <label className="active">{this.props.label}</label>
                </div>

            </StyledInputTag>
        )
    }
}

InputTag.defaultProps = {
    maxCharacter: 24,
    maxLength: 50,
    placeHolder: "Add tags",
    label: "Tags"
};

InputTag.propTypes = {
    data: PropsTypes.array,
    onChange: PropsTypes.func.isRequired,
    maxCharacter: PropsTypes.number,
    maxLength: PropsTypes.number,
    badgeStyle: PropsTypes.object,
    badgeClass: PropsTypes.string,
    containerStyle: PropsTypes.object,
    containerClass: PropsTypes.string,
    inputStyle: PropsTypes.object,
    inputClass: PropsTypes.string,
    placeHolder: PropsTypes.string,
    label: PropsTypes.string
};

/*
-----------------------------------------------------------------
 */

const StyledInputMultiSelect = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: white;
  position: relative;
 
  .angle-container {
    top: 0;
    right: 0;
  }
  
 .dropdown-menu {
       
    > div {
      &:focus {
        outline: none !important;
      }
    }
    
    max-height: 40vh;
    overflow: auto;
    
    .item {
      &:hover {
        background-color: #eee;
      }
      &.active {
        background-color: #eee;
      }
    }
 }
 
`;

export class InputMultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.randomId = Math.round(Math.random() * 1000).toString();
        this.keyLabel = this.props.keyLabel;
        this.valueLabel = this.props.valueLabel;
        this.placeHolder = this.props.placeHolder;
        this.state = {
            search: "",
            selected: this.props.selected
        }
    }

    /* Life circle */
    componentWillReceiveProps(nextProps, nextContext) {
        if (!deepCompareObj(nextProps.selected, this.props.selected)) {
            this.setState({selected: nextProps.selected})
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            !deepCompareObj(nextProps.options, this.props.options) ||
            !deepCompareObj(nextProps.selected, this.props.selected) ||
            !deepCompareObj(nextState.selected, this.state.selected) ||
            nextState.search !== this.state.search
        )
    }

    /*-------------------------------------------------------*/

    /* Select Item */
    handleSelect(item) {
        let selected = JSON.parse(JSON.stringify(this.state.selected));
        let index;

        if (this.props.type === "object") {
            index = selected.map((e) => e[this.keyLabel]).indexOf(item[this.keyLabel]);
        } else {
            index = selected.indexOf(item);
        }

        if (index === -1) {
            selected.push(item);
        } else {
            selected.splice(index, 1);
        }
        this.setState({selected});
        this.props.onChange(selected);
    }

    /* Change search */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /* Check selected */
    checkSelected(item) {
        if (this.props.type === "object") {
            return Boolean(this.state.selected.find((dt) => dt[this.keyLabel] === item[this.keyLabel]));
        } else {
            return this.state.selected.includes(item);
        }
    }

    /* Render string value */
    renderStringValue() {
        let str = "";
        if (this.props.type === "object") {
            this.state.selected.forEach((item, index) => {
                str += item[this.valueLabel] + (index !== this.state.selected.length - 1 ? ", " : "")
            });
        } else {
            this.state.selected.forEach((item, index) => {
                str += item + (index !== this.state.selected.length - 1 ? ", " : "")
            })
        }
        return str === "" ? this.placeHolder : str;
    }

    render() {
        let filterList = this.props.options;
        if (this.state.search !== "") {
            if (this.props.type === "object") {
                filterList = filterList.filter(dt => dt[this.valueLabel].toLowerCase().includes(this.state.search.toLowerCase()))
            } else {
                filterList = filterList.filter(dt => dt.toString().toLowerCase().includes(this.state.search.toLowerCase()))
            }
        }
        return (
            <StyledInputMultiSelect className={this.props.containerClass} style={this.props.containerStyle}>
                {
                    <MDBDropdown>
                        <MDBDropdownToggle tag="div" className="position-relative hover-pointer">
                            <MDBInput
                                label={this.props.label}
                                value={this.renderStringValue()}
                                disabled
                            />
                            <div className="angle-container position-absolute h-100 d-flex align-items-center ">
                                <div className="h-80x d-flex align-items-center px-1 bg-white">
                                    <MDBIcon icon="angle-down"/>
                                </div>
                            </div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="w-95x px-2 ml-1 z-depth-1">
                            {/*<div className="group-search d-flex align-items-center">*/}
                            {/*    <MDBIcon icon="search"/>*/}
                            {/*    <input*/}
                            {/*        className="form-control form-control-sm ml-3 "*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Search"*/}
                            {/*        aria-label="Search"*/}
                            {/*        name="search"*/}
                            {/*        value={this.state.search}*/}
                            {/*        onChange={this.handleChange.bind(this)}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="mt-2">
                                {
                                    filterList.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            className={`py-1 px-2 item ${this.checkSelected(item) ? "active" : ""}`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                this.handleSelect(item)
                                            }}
                                        >
                                            <Checkbox
                                                checked={this.checkSelected(item)}
                                            />
                                            <ListItemText
                                                primary={
                                                    this.props.type === "object"
                                                        ?
                                                        item[this.props.valueLabel]
                                                        :
                                                        item
                                                }
                                            />
                                        </MenuItem>
                                    ))
                                }
                            </div>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                }
            </StyledInputMultiSelect>
        )
    }
}

InputMultiSelect.defaultProps = {
    keyLabel: "id",
    valueLabel: "subject",
    selected: [],
    placeHolder: "Select options",
    label: "Interests",
    type: "object"
};

InputMultiSelect.propTypes = {
    options: PropsTypes.array.isRequired,
    selected: PropsTypes.array,
    keyLabel: PropsTypes.string,
    valueLabel: PropsTypes.string,
    onChange: PropsTypes.func.isRequired,
    containerClass: PropsTypes.string,
    containerStyle: PropsTypes.object,
    placeHolder: PropsTypes.string,
    label: PropsTypes.string,
    type: PropsTypes.oneOf(["array", "object"])
};


