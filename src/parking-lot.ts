export interface Publisher {
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  notify(event: ParkingEvent): void;
}

export interface Subscriber {
  update(event: ParkingEvent): void;
}

export interface ParkingEvent {
  lotName: string;
  occupied: number;
  capacity: number;
  action: "enter" | "exit";
}

export class ParkingLot implements Publisher {
  public occupied: number = 0;
  private subscribers: Subscriber[] = [];

  constructor(
    public name: string,
    public capacity: number,
  ) {}

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  notify(event: ParkingEvent): void {
    this.subscribers.forEach((subscriber) => subscriber.update(event));
  }

  enter() {
    if (!this.isFull()) {
      this.occupied++;
      this.notify({
        lotName: this.name,
        occupied: this.occupied,
        capacity: this.capacity,
        action: "enter",
      });
    } else {
      throw new Error(`The parking lot is full`);
    }
  }

  exit() {
    if (!this.isEmpty()) {
      this.occupied--;
      this.notify({
        lotName: this.name,
        occupied: this.occupied,
        capacity: this.capacity,
        action: "exit",
      });
    } else {
      throw new Error(`The parking lot is empty`);
    }
  }

  isFull() {
    return this.occupied == this.capacity;
  }

  isEmpty() {
    return this.occupied == 0;
  }
}
