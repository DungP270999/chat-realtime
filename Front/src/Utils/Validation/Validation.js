import Alert from "../Notify/Alert";
import Notify from "../Notify/Notify";

function handleOptions(message, options) {
    if (options.pushNotify) {
        Notify.error(message);
    }
    if (options.pushAlert) {
        Alert.alert(message);
    }
}

function checkPassword(password, options = {}) {
    let message = "";
    if (!password) {
        message = "ERROR_PASSWORD_EMPTY";
        handleOptions(message, options);
        return message;
    }
    if (password.length > 30 || password.length < 6) {
        message = "ERROR_PASSWORD_LENGTH";
        handleOptions(message, options);
        return message;
    }
    return "valid";
}

function checkUsername(username, options = {}) {
    let message;
    if (!username) {
        message = "ERROR_USERNAME_EMPTY";
        handleOptions(message, options);
        return message;
    }
    if (username.length > 50 || username.length < 6) {
        message = "ERROR_USERNAME_LENGTH";
        handleOptions(message, options);
        return message;
    }
    return "valid";
}

function checkFullName(fullName, options = {}) {
    let message;
    if (!fullName) {
        message = "ERROR_FULL-NAME_EMPTY";
        handleOptions(message, options);
        return message;
    }
    if (fullName.length > 50 || fullName.length < 6) {
        message = "ERROR_FULL-NAME_LENGTH";
        handleOptions(message, options);
        return message;
    }
    return "valid";
}

function checkEmail(email, options = {}) {
    let message;
    if (!email) {
        message = "ERROR_EMAIL_EMPTY";
        handleOptions(message, options);
        return message;
    }
    if (email.length > 50 || email.length < 6) {
        message = "ERROR_EMAIL_LENGTH";
        handleOptions(message, options);
        return message;
    }
    return "valid";
}

function checkPhoneNumber(phoneNumber, options = {}) {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let message;
    if (!phoneNumber) {
        message = "ERROR_PHONE-NUMBER_EMPTY";
        handleOptions(message, options);
        return message;
    }
    if (!vnf_regex.test(phoneNumber)) {
        message = "ERROR_PHONE-NUMBER_INVALID";
        handleOptions(message, options);
        return message;
    }
    return "valid";
}

export default {
    checkEmail,
    checkFullName,
    checkPassword,
    checkPhoneNumber,
    checkUsername
};
