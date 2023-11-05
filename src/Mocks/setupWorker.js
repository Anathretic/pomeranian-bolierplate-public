import { setupWorker } from 'msw';
import handlers from './ToDo/handlers';
// https://mswjs.io/docs/getting-started/integrate/browser#import-mocks
export const worker = setupWorker(...handlers);
