import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';

import Raffle from '../models/Raffle';
import Ticket from '../models/Ticket';


class RaffleController {
  async index(_, res) {
    const raffleExists = await Raffle.findAll();

    if (!raffleExists) {
      return res.status(404).json({ error: 'No raffle was found!' });
    }

    return res.json(raffleExists);
  }
  
  async store(req, res) {
    const schema = Yup.object().shape({
      raffle_name: Yup.string().required(),
      raffle_deadline: Yup.date().required(),
      raffle_prize: Yup.array().required(),
      raffle_price: Yup.number().required(),
      raffle_draw_date: Yup.date().required(),
      raffle_quantity: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

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

    if (raffle.expired_at != null) {
      return res.status(404).json({
        error: 'The raffle has expired or sold out',
      });
    }

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
      raffle.expired_at = new Date();

      await raffle.save();

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

    if (raffle.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this raffle",
      });
    }

    if (!raffle) {
      return res.status(404).json({
        error: 'You do not have a raffle with the provided id',
      });
    }

    // To delete a raffle without losing the information that we once had, we will
    // just set the expired_at date to today date.

    raffle.expired_at = new Date();

    await raffle.save();

    return res.json(raffle);
  }

  async draw(req, res) {
    const raffle = await Raffle.findOne({ where: { id: req.params.id } });

    if (raffle.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to draw this raffle",
      });
    }

    if (!raffle) {
      return res.status(404).json({
        error: "You don't have a raffle with the provided id",
      });
    }

    const tickets = await Ticket.findAll({ where: { raffle_id: req.params.id } });
    
    const min = tickets[0].id;
    
    const max = min + (Object.keys(tickets).length - 1);

    const sorted_number = Math.floor(Math.random() * (max - min + 1) + min);

    await tickets.forEach(e => {
      e.destroy();
    });

    return tickets.forEach(e => {
      if (e.id == sorted_number) {
        return res.json(e.user_id);
      }
    });
  }

}

export default new RaffleController();
