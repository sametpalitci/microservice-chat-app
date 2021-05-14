require('dotenv').config({path: '../../.env'})

const express = require('express');
const cors = require('cors');
const db = require('./models');
const {graphqlHTTP} = require('express-graphql');

const GraphQLRootSchema = require('./graphql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/graphql', graphqlHTTP((request) => ({
    schema: GraphQLRootSchema,
    graphiql: true,
    context: {request}
})))

db.sequelize.sync().then(() => {
    app.listen(process.env.API_CHAT_GROUP_PORT, () => {
        console.log(`App is listening ${process.env.API_CHAT_GROUP_PORT} PORT`);
    });
}).catch((err) => {
    return res.status(403).json({notice: err.message, status: 'NO'})
})
