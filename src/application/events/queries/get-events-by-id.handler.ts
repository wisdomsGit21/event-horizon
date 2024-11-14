import { GetEventByIdQuery } from "./get-event-by-id.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../../../domain/events/event.entity";

@QueryHandler(GetEventByIdQuery)
export class GetEventByIdHandler  implements  IQueryHandler<GetEventByIdQuery> {
  constructor(@InjectRepository(Event) private  readonly eventRepository: Repository<Event>) {
  }
  async execute(query: GetEventByIdQuery): Promise<Event| undefined> {
    return await this.eventRepository.findOne({
      where: {
        id: query.id
      }
    });
  }
}