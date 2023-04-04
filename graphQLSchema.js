const { gql } = require('apollo-server-express');
const {Users} = require('./database/models');
exports.typeDefs = gql `
type User {
    id: ID
    name: String
    email: String!
    password: String!
    role: String!
}
type Query {
    getUsersList: [User]
    getUser(id: ID!): User
}
type Mutation {
    addUser(name: String, email: String!, password: String, role: String!): User
    updateUser(id: ID! ,name: String, email: String!, password: String, role: String!): User
    deleteUser(id: ID!): Boolean!
} `;

exports.resolvers = {
    Query: {

        getUsersList: async (parent, args) => {
            const result = await Users.findAll();
            return result;

        },
        getUser: async (parent, args) => {
            const result = await Users.findOne({where: {id: args.id}});
            return result || {};

        }
    },

    Mutation: {
        addUser:  async (parent, args) => {
            const user = await Users.create({
                name: args.name,
                email: args.email,
                password: args.password,
                role: args.role
            });
            return user || {};
        },
        updateUser: async (parent, args) => {
            const user = await Users.update({
                name: args.name,
                email: args.email,
                password: args.password,
                role: args.role
                },{ where: { id: args.id } });
            return user || {};
        },
        deleteUser:  async (parent, args) => {
            try {
                await Users.destroy({ where: { id: args.id } });
                return true;
            } catch (error) {
                console.log('Error while delete:',error);
                return false;
            }
            
        }
    }
}