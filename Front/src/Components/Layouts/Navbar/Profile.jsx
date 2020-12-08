import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Popover, Typography} from "@material-ui/core";
import {userClear} from "../../../Redux/Actions/userAction";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const Profile = React.memo(() => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {user} = useSelector(state => ({user: state.user}));
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <FontAwesomeIcon
                className="ml-3"
                color="silver"
                size="2x"
                icon={faUserCircle}
                style={{cursor: "pointer"}}
                onClick={handleClick}
            />
            <Popover
                className="mt-2"
                id={anchorEl ? 'simple-popover' : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography + " border-bottom font-weight-bold"}>
                    {user.fullName}
                </Typography>
                <Typography
                    style={{width: "150px", cursor: "pointer"}}
                    className={classes.typography}
                    onClick={() => dispatch(userClear())}
                >
                    <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>
                    Đăng xuất
                </Typography>
            </Popover>
        </>
    );
});

export default Profile;
