const {GraphQLString} = require('graphql');

const UserType = require('../types/User');
const UserResolver = require('../resolvers/User');

const login = () => {
    return {
        type: UserType,
        args: {
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve: (_, args) => UserResolver.login(args)
    }
};

const register = () => {
    return {
        type: UserType,
        args: {
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve: (_, args) => UserResolver.register(args)
    }
}

module.exports = {login, register}