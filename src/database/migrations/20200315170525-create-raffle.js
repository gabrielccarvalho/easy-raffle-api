/* eslint-disable prettier/prettier */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('raffles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      raffle_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      raffle_deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      raffle_prize: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      raffle_draw_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      raffle_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: queryInterface => queryInterface.dropTable('raffles'),
};
