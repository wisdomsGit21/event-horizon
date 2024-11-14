import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column({type: 'int'})
  availableTickets: number;



  constructor(
     name:string,
     date: Date,
     location: string,
      availableTickets: number

  ) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.availableTickets = availableTickets;
  }



  hasTicketsAvailable(): boolean {
    return this.availableTickets > 0;
  }

  reserveTicket() {
    if(!this.hasTicketsAvailable()) {
      throw new Error("No tickets available for this event");
    }
    this.availableTickets -= 1;
  }
}