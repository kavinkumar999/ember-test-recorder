import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { SIDEBAR_EVENTS } from '../constants/events';

export default class EventManagerService extends Service {
  @tracked events = SIDEBAR_EVENTS;

  @action
  toggleEvent(eventId) {
    this.events = this.events.map((event) => {
      if (event.id === eventId) {
        return { ...event, enabled: !event.enabled };
      }
      return event;
    });
  }

  isEventEnabled(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    return event?.enabled ?? false;
  }
}
