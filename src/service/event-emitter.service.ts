class EventEmitterHandler {
  events: any = {};

  emit(what: string | number, sendThis: any) {
    this.createIfNotExists(what);
    Object.values(this.events[what])
      .map(subscriber => subscriber as Function)
      .forEach((subscriber: Function) => subscriber(sendThis));
  }

  subscribe(who: string, what: string | number, doThis: Function) {
    this.createIfNotExists(what);
    this.events[what][who] = doThis;
  }

  createIfNotExists(event: string | number) {
    if (!this.events[event]) {
      this.events[event] = {};
    }
  }
}

export const EventEmitter = new EventEmitterHandler()

export enum EventList {
  LanguageChanged
}
