import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerUserHandler,
  getUsersHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post("/", registerUserHandler);

  server.post("/login", loginHandler);

  server.get("/", getUsersHandler);
}

export default userRoutes;
