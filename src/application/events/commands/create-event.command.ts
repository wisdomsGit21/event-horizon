export class CreateEventCommand {
  constructor(
    public readonly name: string,
    public readonly location: string,
    public readonly date: Date,
    public readonly availableTickets: number
  ) {
  }
}