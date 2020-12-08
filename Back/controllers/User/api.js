const serviceUser = require('./service');
const {User, comparePassword} = require('./modal/user.modal');
const bcrypt = require('bcrypt');
const {jwtConfig} = require('../../config/config');
const {get_token} = require('./token');

async function register(req, res) {
    try {
        let {name, email, password} = req.body;
        let createUser = await User.create(
            {name, email, password}
        );
        return res.status(200).send(createUser);
    } catch (e) {
        return res.status(400).send(e);
    }
}

async function login(req, res) {
    const {email, password} = req.body;
    try {
        if (!email || !password) return res.status(400).send('Invalid user');
        const getUser = await User.findOne({
            where: {email: email}
        });
        if (!getUser || !bcrypt.compareSync(password, getUser.password)) return res.status(400).send('Sai email hoặc password');
        let pw = getUser.password;
        let cs = pw.slice(pw.length - jwtConfig.csLength, pw.length);

        const authToken = get_token(
            {uuid: getUser.uuid, cs}, jwtConfig.email_secret, jwtConfig.emailTokenLife
        );
        getUser.password = undefined;
        const userInfo = Object.assign({authToken}, getUser.toJSON());
        return res.status(200).send(userInfo);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}

async function deleteUser(req, res) {
    try {
        let {userId} = req.params;
        await User.destroy({
            where: {
                id: userId
            }
        });
        return res.status(200).send(`Xóa thành công user ${userId}`);
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = {
    register,
    deleteUser,
    login
};
