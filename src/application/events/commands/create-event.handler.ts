import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCommand } from './create-event.command';
import { Event } from '../../../domain/events/event.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {

  constructor(@InjectRepository(Event) private  readonly eventRepository: Repository<Event>) {
  }

  async execute(command: CreateEventCommand): Promise<Event> {
    const { location, date, name, availableTickets } = command;

    const event =  this.eventRepository.create({
      name,
      date,
      location,
      availableTickets
    })

    return  await this.eventRepository.save(event);
  }
}