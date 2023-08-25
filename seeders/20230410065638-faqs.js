module.exports = {
  up: async (queryInterface) => {
    var faqsData = [];

    faqsData = [
      {
        question: "What is your password",
        answer: "My password is 111111111",
      },
      {
        question: "What is your email",
        answer: "My email is my@example.com",
      },
    ];

    return queryInterface.bulkInsert("faqs", faqsData, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("faqs", null, {}),
};