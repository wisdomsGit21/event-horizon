import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateEventHandler } from "./commands/create-event.handler";
import { EventsController } from "../../interfaces/events/events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Event} from "../../domain/events/event.entity"
import { GetAllEventsHandler } from "./queries/get-all-events-handler";
import { GetEventByIdHandler } from "./queries/get-events-by-id.handler";


@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Event])],
  providers: [CreateEventHandler, GetAllEventsHandler, GetEventByIdHandler],
  controllers: [EventsController]
})
export class EventsModule {}