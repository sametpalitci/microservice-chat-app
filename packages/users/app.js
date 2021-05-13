require('dotenv').config({path: '../../.env'})

const express = require('express');
const cors = require('cors');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const db = require('./models');

app.use(express.json());
app.use(cors());

const rootSchema = require('./graphql');

app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
}));

db.sequelize.sync().then(() => {
    app.listen(process.env.API_USERS_PORT, () => {
        console.log(`App is listening PORT: ${process.env.API_USERS_PORT}`);
    })
}).catch((err) => {
    return res.status(403).json({notice: "An Error!", status: 'NO'})
})

