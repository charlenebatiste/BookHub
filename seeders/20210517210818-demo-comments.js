'use strict';

const commentData = [
  {
    content: `All I have to say is: Freud would have a field day with this one...`,
    userId: 3,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {
    content: `Is it because this is the story of how one angry, naked, sneezing albino managed to terrorize the English countryside?`,
    userId: 4,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: `Just as relevant today as 200 years ago.`,
    userId: 5,
    postId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: `It's certainly not for girls gets as the two female characters of any consequence are both confined to plot devices.`,
    userId: 1,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /** 
     * Add seed commands here.
    */
     await queryInterface.bulkInsert('comments', commentData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
     await queryInterface.bulkDelete('comments', null, {});
  }
};
