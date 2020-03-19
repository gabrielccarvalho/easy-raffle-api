import Sequelize, { Model } from 'sequelize';

class Ticket extends Model {
  static init(sequelize) {
    super.init(
      {
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Raffle, { foreignKey: 'raffle_id', as: 'raffle' });
  }
}

export default Ticket;
