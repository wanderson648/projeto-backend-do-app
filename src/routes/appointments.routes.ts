import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRespository from '../repositories/appointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRespository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ messagem: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
