'use strict';

const postData = [
  {
    title: 'Flowers (aka children) in the Attic',
    content: `I am passed chapter 7 and all I want to know is WHEN do they get OUT OF THE ATTIC?! and Secondly how can the mother leave her children up there and go gallivanting around while they are miserable?`,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: `'The Invisible Man' blew my mind`,
    content: `Let me preface this with an apology. If I sound stunningly inarticulate at times in this review, I can't help it. My mind is completely fried.`,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: `'Dark Witch': Paranormal, yes. Romance, not even a little`,
    content: `Sure, there IS a romance in this novel. Iona and Boyle meet, chat, wink at each, flirt some, sleep together...big deal. But if you enjoy a solid background story with some dark magic and prophesies, read this and we can talk.`,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: `Can ANYONE explain to me the point of 'The Left Hand of God'`,
    content: `Starting with why the Lord of Discipline is cutting open girls because that is NEVER explained... and WHO exactly is this book for? Between shifting tones and broad arguments I'm struggling to understand what the takeaway is.`,
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Victor Frankenstein can eat rocks',
    content: `As far as I am concerned, Victor Frankenstein is clearly the villain of the piece. My heart shattered for the “monster”. A orphaned, outcast of a creature driven to a place of contempt due to the horrible, mistreatment by it's creator.`,
    userId: 5,
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
     await queryInterface.bulkInsert('posts', postData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('posts', null, {});
  }
};
