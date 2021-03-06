const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const GroupType = new GraphQLObjectType({
    name: "GroupType",
    description: 'Group Management',
    fields: {
        name: {
            type: GraphQLString
        },
        id: {
            type: GraphQLID
        }
    }
});

const JoinLeaveType = new GraphQLObjectType({
    name: "JoinLeaveType",
    description: 'Group Management',
    fields: {
        groupId: {
            type: GraphQLID
        }
    }
});

const allGroup = new GraphQLObjectType({
    name: "allGroupType",
    description: 'All Group Management',
    fields: {
        name: {
            type: GraphQLString
        },
        id: {
            type: GraphQLID
        }
    }
});

module.exports = {GroupType, JoinLeaveType, allGroup};