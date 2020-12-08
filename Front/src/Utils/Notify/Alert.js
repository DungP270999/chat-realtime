const smalltalk = require('smalltalk');

const _default_title = "Yahoo";

function alert(msg, title = _default_title) {
    smalltalk.alert(title, msg);
}

function confirm(msg, callback) {
    smalltalk.confirm(_default_title, msg)
        .then(() => {
            return callback(true);
        })
        .catch(() => {
            return callback(false);
        });
}

export default {
    alert,
    confirm
};
