const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');

// const {
//     GraphQLServer
// } = require('graphql-yoga');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// const opts = {
//     endpoint: '/graphql',
//     playground: '/graphql',
//     port: 7777,
// }
//
//
// const server = new GraphQLServer({
//     typeDefs: './src/schema.graphql',
//     resolvers,
// })




// server.start(opts, () => console.log(`Server is running on http://localhost:${opts.port}`));
app.listen(process.env.PORT || 4000, () => {
    console.log("listening at port 4000");
});