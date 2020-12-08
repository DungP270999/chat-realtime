import React from 'react';
import {MDBBtn, MDBCol, MDBRow} from "mdbreact";
import propTypes from "prop-types";
import {_rootPath} from "../../Config";
import {CircularProgress} from '@material-ui/core';

const FactoryOrder = React.memo(({data, type, handleClick, isOrdered}) => {
    const renderTitleBtn = () => {
        switch (type) {
            case "new":
                return "Nhận đơn";
            case "processing":
                return "Hoàn thành";
            case "done":
                return "Đã hoàn thành";
            default:
                return null;
        }
    };

    const renderColorBtn = () => {
        switch (type) {
            case "new":
                return "yellow";
            case "processing":
                return "light-green";
            case "done":
                return "blue-grey";
            default:
                return null;
        }
    };

    return (
        <MDBRow className="order-item mb-3 rounded mx-1 z-depth-1">
            <MDBCol md="4" xl="5" className="d-flex p-0 mt-3">
                <div className="image-item-frame rounded ml-3 align-items-center d-flex justify-content-center border ">
                    <img
                        alt=""
                        src={
                            _rootPath.split("/api/v1").join("/media/")
                            + (data?.parent ? data.parent.product.image : data?.product?.image)?.split("\\").join("/")
                        }
                        className="img-fluid"
                    />
                </div>
            </MDBCol>
            <MDBCol md="8" xl="7" className="mt-2 mb-3">
                <MDBRow className="mr-2">
                    <MDBCol md="12" className="p-0">
                        <div className="item-title font-weight-bold">
                            {data.note || data.product.name}
                        </div>
                        <div className="item-amount">
                            Số lượng: <span className="font-weight-bold">{data.quantity}</span>
                        </div>
                        <div className="item-date">
                            {data.createdDate}
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex align-items-end justify-content-end mx-0 mt-1">
                    <MDBBtn
                        color={renderColorBtn()}
                        onClick={() => handleClick(data)}
                        disabled={type === "done"}
                        style={type === "done" ? {width: "275px"} : {}}
                        size="lg"
                        className="button-order_new font-weight-bold"
                    >
                        {
                            isOrdered || type === "done" ?
                                renderTitleBtn()
                                :
                                <CircularProgress
                                    color="inherit"
                                    size={20}
                                />
                        }
                    </MDBBtn>
                </MDBRow>
            </MDBCol>
        </MDBRow>
    );
});

FactoryOrder.propTypes = {
    data: propTypes.object.isRequired,
    handleClick: propTypes.func,
    isOrdered: propTypes.bool,
    type: propTypes.oneOf(['new', 'processing', 'done'])
};

FactoryOrder.defaultProps = {
    type: 'new',
    handleClick: () => {
    },
    isOrdered: false
};

export default FactoryOrder;
