import Raffle from '../models/Raffle';
import Ticket from '../models/Ticket';

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

  async buy(req, res) {
    const raffle = await Raffle.findOne({ where: { id: req.params.id } });

    if (!raffle) {
      return res.status(404).json({
        error: 'There is no raffle with that id',
      });
    }

    if (raffle.user_id === req.userId) {
      return res.status(401).json({
        error: "You can't buy your own raffle",
      });
    }

    if (raffle.raffle_quantity == 0) {
      return res.status(400).json({
        error: "There isn't any raffle left."
      });
    }

    raffle.raffle_quantity -= 1;

    await raffle.save();

    const ticket = await Ticket.create({
      user_id: req.userId,
      raffle_id: req.params.id,
    });

    return res.json(ticket);

  }

  async delete(req, res) {
    const raffle = await Raffle.findOne({ where: { id: req.params.id } });

    if (!raffle) {
      return res.status(404).json({
        error: 'You do not have a raffle with the provided id',
      });
    }

    if (raffle.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this raffle",
      });
    }

    // To delete a raffle without losing the information that we once had, we will
    // just set the expired_at date to today date.

    raffle.expired_at = new Date();

    await raffle.save();

    return res.json(raffle);
  }

  async hardDelete(req, res) { // Not recomended to use
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

    raffle.destroy();

    return res.json(raffle);
  }
}

export default new RaffleController();
