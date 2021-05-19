'use strict';

const commentData = [
  {
    author: 'Mary',
    content: `All I have to say is: Freud would have a field day with this one...`,
    userId: 3,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
   {
    author: 'Billy',
    content: `Is it because this is the story of how one angry, naked, sneezing albino managed to terrorize the English countryside?`,
    userId: 4,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    author: 'Charlene',
    content: `Just as relevant today as 200 years ago.`,
    userId: 1,
    postId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    author: 'Annie',
    content: `It's certainly not for girls seeing as the two female characters of any consequence are both confined to plot devices.`,
    userId: 2,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
 ]

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
     await queryInterface.bulkInsert('comments', commentData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('comments', null, {});
  }
};
