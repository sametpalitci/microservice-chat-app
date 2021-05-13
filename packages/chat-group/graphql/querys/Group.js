const {GraphQLString, GraphQLList} = require('graphql');
const {allGroup} = require('../types/Group');
const GroupResolver = require('../resolvers/Group');
const {verifyJWT} = require('../../utils/index')

const getGroup = () => {
    return {
        type: new GraphQLList(allGroup),
        args: {
            name: {
                type: GraphQLString
            }
        },
        resolve: (_, args, context) => {
            return verifyJWT(context, () => GroupResolver.allGroup(args, context));
        }
    }
};

module.exports = {getGroup}