'use strict';

const userData = [
  {
  name: 'Charlene',
  email: 'charlene@gmail.com',
  password: 'charlenepw',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'Annie',
  email: 'annie@gmail.com',
  password: 'anniepassword',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'Mary',
  email: 'mary@gmail.com',
  password: 'marypassword',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'Billy',
  email: 'billy@gmail.com',
  password: 'billypassword',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'Anja',
  email: 'anja@gmail.com',
  password: 'anjapassword',
  createdAt: new Date(),
  updatedAt: new Date()
},
]
// these are fake users: any return info is made up and not linked to a real person

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
