import  {Event} from "../events/event.entity";


export class Ticket {
  constructor(
    private readonly id: string,
    private readonly  event: Event,
    private ownerId: string |  null,
    private purchasedAt: Date | null
  ) {
  }

  purchase(ownerId: string) {
    if(this.ownerId !== null) {
      throw new Error("Ticket already purchased");
    }
    this.ownerId = ownerId;
    this.purchasedAt = new Date();
  }
}