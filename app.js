const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 4000, () => {
    console.log("listening at port 4000");
});