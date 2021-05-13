const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../models');

const {checkFields} = require('../../utils');

const login = async (args) => {
    const {email, password} = args;
    if (!checkFields(email, password)) {
        throw new Error("The fields can't be empty.");
    }
    const checkEmail = await db.users.findOne({where: [{email}], raw: true});
    if (!checkEmail || !bcrypt.compareSync(password, checkEmail.password)) {
        throw new Error("E-mail or Password is wrong!");
    }
    checkEmail.token = jwt.sign({email, id:checkEmail.id}, process.env.SECRET_KEY)
    return checkEmail;
};

const register = async (args) => {
    const {email, password} = args;
    if (!checkFields(email, password)) {
        throw new Error("The fields can't be empty.");
    }
    const checkEmail = await db.users.findOne({where: [{email}], raw: true});
    if (checkEmail) {
        throw new Error("This email already used by another user");
    }
    try {
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const potentialUser = {
            email,
            password: hashPassword
        };
        const createdUser = await db.users.create(potentialUser);
        createdUser.token = jwt.sign({email, id:createdUser.id}, process.env.SECRET_KEY);
        return createdUser;
    } catch (e) {
        throw new Error("we have problem!");
    }
};

module.exports = {login, register}