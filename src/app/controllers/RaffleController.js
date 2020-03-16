import Raffle from '../models/Raffle';

class RaffleController {
  async index(_, res) {
    const raffleExists = await Raffle.findAll();

    if (!raffleExists) {
      return res.status(404).json({ error: 'No raffle was found!' });
    }

    return res.json(raffleExists);
  }
  
  // async store(req, res) {
  //   const raffleExists = await Raffle.findOne({ where: { raffle_name: req.body.raffle_name } });

  //   if (raffleExists) {
  //     return res.status(400).json({ error: 'Raffle already exists.' });
  //   }

  //   const raffle = await Raffle.create({
  //     id,
  //     user_id: req.userId,
  //     raffle_name,
  //     raffle_deadline,
  //     raffle_prize,
  //     raffle_draw_date,
  //   });

  //   return res.json(raffle);
  // }
}

export default new RaffleController();
