export enum State {
  created,
  running,
  paused,
  finished,
}
export class Countdown {
  private millis: number;
  private state: State;
  constructor(seconds: number) {
    this.millis = seconds * 1000;
  }

  public start() {
    switch (this.state) {
      case State.created:
        this.state = State.running;
        break;
    }
  }

  public stop() {}

  private async run() {
    const loopsPerUpdate = 10;
    const sleepTime = 1000 / loopsPerUpdate;
    let iterations = 0;
    while (true) {
      this.sleep(sleepTime);
      if (iterations > 0 && iterations % loopsPerUpdate == 0) {
        console.log(`countdown: ${this.millis / 1000.0}`);
      }
      switch (this.state) {
        case State.running:
      }
      if (this.state == State.running) {
        this.millis -= sleepTime;
      }
      iterations++;
    }
  }

  private sleep(millis: number) {
    return new Promise((r) => setTimeout(r, millis));
  }
}
