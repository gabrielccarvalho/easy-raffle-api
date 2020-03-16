import Sequelize, { Model } from 'sequelize';

class Raffle extends Model {
  static init(sequelize) {
    super.init(
      {
        raffle_name: Sequelize.STRING,
        raffle_deadline: Sequelize.DATE,
        raffle_prize: Sequelize.ARRAY(Sequelize.STRING),
        raffle_draw_date: Sequelize.DATE
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Raffle;
