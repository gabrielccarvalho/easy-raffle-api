import Raffle from '../models/Raffle';

import { isBefore, parseISO } from 'date-fns';

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

    const {
      raffle_name,
      raffle_deadline,
      raffle_prize,
      raffle_price,
      raffle_draw_date,
      raffle_quantity,
    } = req.body;

    // Verifying the passed data

    if (isBefore(parseISO(raffle_deadline), new Date())) {
      return res.status(401).json({
        error: 'You can not set the deadline in the past.',
      });
    }

    if (isBefore(parseISO(raffle_draw_date), new Date())) {
      return res.status(401).json({
        error: 'You can not set the draw date in the past.',
      });
    }

    if (isBefore(parseISO(raffle_draw_date), parseISO(raffle_deadline))) {
      return res.status(401).json({
        error: 'You can not set the draw date before the deadline.',
      });
    }

    const raffle = await Raffle.create({
      user_id: req.userId,
      raffle_name,
      raffle_deadline,
      raffle_prize,
      raffle_price,
      raffle_draw_date,
      raffle_quantity
    });

    return res.json(raffle);
  }

  async delete(req, res) {
    const raffle = await Raffle.findOne({ where: { id: req.params.id } });

    if (!raffle) {
      return res.status(404).json({
        error: "You don't have a raffle with the provided id",
      });
    }

    if (raffle.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this raffle",
      });
    }
    // To delete a raffle we just bring the deadline date to now, that way,
    // the user won't be able to buy that raffle nor will be able to see that.
    raffle.destroy();

    return res.json(raffle);
  }
}

export default new RaffleController();
