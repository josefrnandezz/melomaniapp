import { CancelEventHandler } from './cancel-event.handler';
import { CreateEventHandler } from './create-event.handler';
import { UpdateEventHandler } from './update-event.handler';

export * from './cancel-event.command';
export * from './create-event.command';
export * from './update-event.command';

export const commandHandlers = [
  CreateEventHandler,
  UpdateEventHandler,
  CancelEventHandler,
];
