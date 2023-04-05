const { GraphQLDateTime } = require("graphql-iso-date");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const userResolver = require("./user");

module.exports = [customScalarResolver, userResolver];
