"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "kikindb",
        email: "enriquedb2@gmail.com",
        password:
          "$2b$10$Iedh.SPeJChthLli3ga8TeJtpKe3YLPX3//EFs6bcZs1E6in8LFNm",
        image: null,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
