const { ApolloServer } = require('apollo-server-express');
const express = require("express");
const sequelize = require("./database/connection");
const schema = require("./src/schema");
const resolvers = require("./src/resolvers");
const app = express();
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        introspection: true,
        typeDefs: schema,
        resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api/graphql" });
}
startServer();
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
app.listen(4000, ()=> {
    console.log(`Server is runnung on port 4000`);
});