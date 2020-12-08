import Notify from "./Notify";

// const _errorMessage = {};

export default function displayError(error, options = {}) {
    if (error?.response?.data?._error_message === "Permission Denied!") {
        Notify.error("Tài khoản không đủ quyền hạn");
        return;
    }
    if (error.response) {
        Notify.error(error.response.data._error_message);
    }
}

