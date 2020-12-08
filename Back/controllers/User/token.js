const jwt = require('jsonwebtoken');

function get_token(user, secret, max_age = null) {
    try {
        if (max_age)
            return jwt.sign(user, secret, {expiresIn: max_age});
        return jwt.sign(user, secret);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get_token,
};
