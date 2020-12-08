import rootAPI, {_rootPath, displayError} from "../rootAPI";

const path = {
    auth: {
        login: _rootPath + "/login",
    }
};

function login(data, callback) {
    rootAPI({withToken: false}).post('http://localhost:8888/api/v1/login', data)
        .then(res => {
            return callback(null, res.data);
        })
        .catch(error => {
            displayError(error);
            return callback(error);
        });
}

export default {
    login,
};
