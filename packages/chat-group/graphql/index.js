const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql')
const groupQuery = require('./querys/Group');
const groupMutation = require('./mutations/Group');

const rootQuery = new GraphQLObjectType({
    name:'RootQuery',
    description:'Default Root Query',
    fields:{
        getGroup:groupQuery.getGroup()
    }
});

const mutation = new GraphQLObjectType({
    name:'RootMutation',
    description:'Default Root Mutation',
    fields:{
        addGroup:groupMutation.addGroup(),
        joinGroup:groupMutation.joinGroup(),
        leaveGroup:groupMutation.leaveGroup()
    }
});

const GraphQLRootSchema = new GraphQLSchema({
    query:rootQuery,
    mutation
});

module.exports = GraphQLRootSchema;