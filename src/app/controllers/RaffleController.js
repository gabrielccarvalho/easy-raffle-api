import Raffle from '../models/Raffle';

class RaffleController {
  async index(_, res) {
    const raffleExists = await Raffle.findAll();

    if (!raffleExists) {
      return res.status(404).json({ error: 'No raffle was found!' });
    }

    return res.json(raffleExists);
  }
  
  async store(req, res) {
    const raffleExists = await Raffle.findOne({ where: { raffle_name: req.body.raffle_name } });

    if (raffleExists) {
      return res.status(400).json({ error: 'Raffle already exists.' });
    }

    const user_id = req.userId;

    const {
      id,
      user_id,
      raffle_name,
      raffle_deadline,
      raffle_prize,
      raffle_price,
      raffle_draw_date
    } = await Raffle.create(req.body);

    return res.json({
      id,
      user_id,
      raffle_name,
      raffle_deadline,
      raffle_prize,
      raffle_price,
      raffle_draw_date
    });
  }
}

export default new RaffleController();
