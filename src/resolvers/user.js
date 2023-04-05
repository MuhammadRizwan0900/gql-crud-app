"use strict";
const {Users} = require('../../database/models');

module.exports = {
  Query: {

    getUsersList: async (parent, args) => {
      const result = await Users.findAll();
      return result;
    },
    getUser: async (parent, args) => {
      const result = await Users.findOne({where: {id: args.id}});
      return result;
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
      return user;
    },
    updateUser: async (parent, args) => {
      const result = await Users.findOne({where: {id: args.id}});
      if(!result) {
        return {
          message: "User does not exist"
        }
      }
      let user = await Users.update({
        name: args.name,
        email: args.email,
        password: args.password,
        role: args.role
      },{ where: { id: args.id } });
      user = await Users.findOne({where: {id: args.id}});
      return user;
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
};
