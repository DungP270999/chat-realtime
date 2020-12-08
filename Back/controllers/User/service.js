const {User} = require('./modal/user.modal');

async function createUser(dataUser) {
    try {
        let register = await User.create(
            {
                name: dataUser.name,
                email: dataUser.email,
                password: dataUser.password
            }
        );
        return register;
    } catch (err) {
        console.log(err);
        return [err]
    }
}

module.exports = {
    createUser
};
