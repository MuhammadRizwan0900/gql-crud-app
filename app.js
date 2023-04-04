const { ApolloServer } = require('apollo-server');
const sequelize = require("./database/connection");
const schema = require('./graphQLSchema');

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
server.listen({port: 4000}).then(({url}) => console.log(`Server is running at ${url}`));