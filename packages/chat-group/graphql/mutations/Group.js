const {GraphQLString, GraphQLID} = require('graphql');

const {GroupType, JoinLeaveType} = require('../types/Group');
const {verifyJWT} = require('../../utils');
const GroupResolver = require('../resolvers/Group');

const addGroup = () => {
    return {
        type: GroupType,
        args: {
            name: {
                type: GraphQLString
            }
        },
        resolve: (_, args, context) => {
            return verifyJWT(context, () => GroupResolver.add(args, context));
        }
    };
};

const joinGroup = () => {
    return {
        type: JoinLeaveType,
        args: {
            groupId: {
                type: GraphQLID
            }
        },
        resolve: (_, args, context) => {
            return verifyJWT(context, () => GroupResolver.join(args, context));
        }
    }
};

const leaveGroup = () => {
    return {
        type: JoinLeaveType,
        args: {
            groupId: {
                type: GraphQLID
            }
        },
        resolve: (_, args, context) => {
            return verifyJWT(context, () => GroupResolver.leave(args, context));
        }
    }
}

module.exports = {addGroup, joinGroup, leaveGroup}