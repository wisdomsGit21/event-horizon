import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateEventCommand } from "../../application/events/commands/create-event.command";
import { CreateEventDto, CreateEventDtoType } from "./create-event.dto";
import { GetAllEventsQuery } from "../../application/events/queries/get-all-events.query";
import { GetEventByIdQuery } from "../../application/events/queries/get-event-by-id.query";

@Controller('events')
export class EventsController {
  constructor(
    private  readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  @Post()
  async createEvent(@Body() body: CreateEventDtoType) {

    const result = CreateEventDto.safeParse(body)
    if(!result.success) {
      throw new BadRequestException(result.error.errors)
    }
    const {name, date, location, availableTickets} = result.data
    const command = new CreateEventCommand(
      name,
      location,
      new Date(date),
      availableTickets
    );

    return await this.commandBus.execute(command);
  }


  @Get()
  async getAllEvents(@Query('page') page = 1, @Query('limit') limit = 10) {
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    if(isNaN(parsedPage) || isNaN(parsedLimit)) {
      throw new BadRequestException('Page and limit must be numbers')
    }
    return await this.queryBus.execute(new GetAllEventsQuery(parsedPage, parsedLimit));
  }


  @Get(':id')
  async  getEventById(@Param('id', new ParseUUIDPipe()) id: string) {
    const event = await this.queryBus.execute(new GetEventByIdQuery(id))

    if(!event) {
      throw new NotFoundException('Event not found')
    }

    return event
  }
}