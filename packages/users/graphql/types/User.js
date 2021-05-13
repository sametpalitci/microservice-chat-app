const {GraphQLObjectType, GraphQLID,GraphQLString} = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Management",
    fields: {
        id: {
            type: GraphQLID
        },
        email:{
            type:GraphQLString
        },
        token:{
            type:GraphQLString
        }
    }
});

module.exports = UserType;