import { rest } from 'msw';
import {
  addToDo,
  deleteToDo,
  getFromLocalStorage,
  getToDo,
  markAsDone,
  updateToDo,
} from './localStorage';
export const baseURL = 'http://localhost:3333';
export const basePath = `${baseURL}/api/todo`;
export const DELAY = 10;

const mockGet = rest.get(basePath, (req, res, ctx) => {
  const data = getFromLocalStorage();
  req.headers.delete();
  return res(ctx.delay(DELAY), ctx.json(data));
});

const mockGetOne = rest.get(`${basePath}/:id`, (req, res, ctx) => {
  const id = parseInt(req.params?.id);
  const todo = getToDo(id);
  return res(ctx.delay(DELAY), ctx.json(todo));
});

const mockPost = rest.post(basePath, async (req, res, ctx) => {
  const body = await req.text();
  const reqToDo = JSON.parse(body);
  const newToDo = addToDo(reqToDo);
  return res(ctx.delay(DELAY), ctx.json(newToDo));
});

const mockDelete = rest.delete(`${basePath}/:id`, (req, res, ctx) => {
  const id = parseInt(req.params?.id);
  deleteToDo(id);
  return res(ctx.delay(DELAY), ctx.json({ id }));
});

const mockMarkAsDone = rest.put(
  `${basePath}/:id/markAsDone`,
  (req, res, ctx) => {
    const id = parseInt(req.params?.id);
    const newToDo = markAsDone(id);
    return res(ctx.delay(DELAY), ctx.json(newToDo));
  }
);

const mockUpdate = rest.put(`${basePath}/:id`, async (req, res, ctx) => {
  const id = parseInt(req.params?.id);
  const body = await req.text();
  const newToDo = JSON.parse(body);
  updateToDo(id, newToDo);
  return res(ctx.delay(DELAY), ctx.json(newToDo));
});

const handlers = [
  mockGet,
  mockGetOne,
  mockPost,
  mockDelete,
  mockMarkAsDone,
  mockUpdate,
];
export default handlers;
