const {checkFields} = require('../../utils');
const jwt = require('jsonwebtoken');
const db = require('../../models');

const add = async (args, context) => {
    const {name} = args;
    if (!checkFields(name)) {
        throw new Error('The fields can not be empty');
    }
    const verifyToken = jwt.verify(context.request.headers.authorization, process.env.SECRET_KEY);
    try {
        const potentialGroup = {
            name,
            userId: verifyToken.id
        };
        return await db.groups.create(potentialGroup);
    } catch (err) {
        throw new Error(err.message);
    }
};

const join = async (args, context) => {
    const {groupId} = args;
    if (!checkFields(groupId)) {
        throw new Error('The fields can not be empty');
    }
    const verifyToken = jwt.verify(context.request.headers.authorization, process.env.SECRET_KEY);
    try {
        const potentialJoin = {
            groupId,
            userId: verifyToken.id,
            status: true
        };
        return await db.grouplogs.create(potentialJoin);
    } catch (err) {
        throw new Error(err.message);
    }
}

const leave = async (args, context) => {
    const {groupId} = args;
    if (!checkFields(groupId)) {
        throw new Error('The fields can not be empty');
    }
    const verifyToken = jwt.verify(context.request.headers.authorization, process.env.SECRET_KEY);
    try {
        const findGroupForUser = await db.grouplogs.findOne({where: [{groupId, userId: verifyToken.id}], raw: true});
        findGroupForUser.status = false;
        return await db.grouplogs.update(findGroupForUser, {where: [{groupId, userId: verifyToken.id}]});
    } catch (err) {
        throw new Error(err.message);
    }
}

const allGroup = async (args, context) => {
    try {
        return await db.grouplogs.findAll({
            attributes: [
                'group.name',
                'group.id'
            ], include: db.groups, raw: true,
            where:[{
                status:true
            }]
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {add, join, leave, allGroup};