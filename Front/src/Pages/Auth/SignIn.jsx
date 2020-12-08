import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import apiAuth from '../../Api/Auth/Auth';
import {userChange} from "../../Redux/Actions/userAction";

const SignIn = React.memo(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isHidePassword, setIsHidePassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            return;
        }
        setIsLoading(true);
        apiAuth.login({email: username, password}, (err, result) => {
            if (result) {
                dispatch(userChange(result));
            }
            setIsLoading(false);
        });
    };

    return (
        <div className="auth_sign-in d-flex justify-content-center align-items-center">
            <div>
                <Form className="sign-in_form p-5">
                    <div className='d-flex justify-content-center mb-3'>
                        <img alt='' src='https://logodownload.org/wp-content/uploads/2019/09/yahoo-logo.png'
                             style={{width: 200}}/>
                    </div>
                    <FormGroup>
                        <Label>Tài khoản</Label>
                        <Input
                            className="sign-in_input"
                            type="email"
                            name="username"
                            id="exampleEmail"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Mật khẩu</Label>
                        <div className="d-flex align-items-center justify-content-end">
                            <Input
                                className="sign-in_input"
                                type={isHidePassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                id="examplePassword"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon
                                className="sign-in_icon-show-password position-absolute"
                                icon={isHidePassword ? faEyeSlash : faEye}
                                onClick={() => setIsHidePassword(!isHidePassword)}
                            />
                        </div>
                    </FormGroup>
                    <div className="d-flex flex-row-reverse">
                        <Link to="/auth/forgot-password">
                            <div className="sign-in_forgot-password">
                                Forgot password?
                            </div>
                        </Link>

                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Button
                            className="sign-in_button"
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {
                                isLoading ?
                                    <Spinner
                                        color="white"
                                        size="sm"
                                    />
                                    :
                                    "Đăng nhập"
                            }
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SignIn;
