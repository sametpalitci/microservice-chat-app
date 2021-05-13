const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const userMutation = require('./mutations/User');

const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    description:"Default Query",
    fields:{
        hello:{
            type:GraphQLString,
            resolve:()=> "world"
        }
    }
});

const mutation = new GraphQLObjectType({
    name:"Mutation",
    description:"Default Mutation",
    fields:{
        login:userMutation.login(),
        register:userMutation.register(),
    }
});

const rootSchema = new GraphQLSchema({
    query:rootQuery,
    mutation
});

module.exports = rootSchema;