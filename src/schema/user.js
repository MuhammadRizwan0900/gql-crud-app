const { gql } = require("apollo-server-express");

module.exports = gql`
type User {
    id: ID
    name: String
    email: String!
    password: String!
    role: String!
}
extend type Query {
    getUsersList: [User]
    getUser(id: ID!): User
}
extend type Mutation {
    addUser(name: String, email: String!, password: String, role: String!): User
    updateUser(id: ID! ,name: String, email: String, password: String, role: String): User
    deleteUser(id: ID!): Boolean!
} `;