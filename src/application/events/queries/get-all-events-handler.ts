import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEventsQuery } from './get-all-events.query';
import { Event } from '../../../domain/events/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllEventsQuery)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsQuery> {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(
    query: GetAllEventsQuery,
  ): Promise<{ events: Event[]; total: number; page: number; limit: number }> {
    const { page, limit } = query;
    const offset = (page - 1) * limit;
    const events = await this.eventRepository.find({
      take: limit,
      skip: offset,
    });
    return {
      events,
      total: await this.eventRepository.count(),
      page,
      limit,
    };
  }
}