import React from "react";
import {MDBBtn, MDBCol} from "mdbreact";
import {useDispatch} from "react-redux";
import {userClear} from "../../Redux/Actions/userAction";
import Notify from "../../Utils/Notify/Notify";
import Alert from "../../Utils/Notify/Alert";

const RightLayout = React.memo(() => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        Alert.confirm('Bạn có muốn đăng xuất?', () => {
            dispatch(userClear());
            setTimeout(() => {
                Notify.success('Đăng xuất thành công');
            }, 100)
        })
    };

    return (
        <MDBCol className='right-layout' size={3}>
            <MDBBtn onClick={handleLogout}>
                Đăng xuất
            </MDBBtn>
        </MDBCol>
    )
});

export default RightLayout;
