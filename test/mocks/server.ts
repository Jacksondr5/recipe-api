import { setupServer } from "msw/node";

const combineHandlers: never[] = [];
export const server = setupServer(...combineHandlers);
