import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import { options } from "./utils/config";

export const server = Fastify()

/*declare module 'fastify' {
    interface FastifyInstance {
      config: {
        confKey: 'config',
        PORT: number
      };
    }
}*/

function buildServer() {
    // configs
    // server.register(fastifyEnv, options).ready()

    return server;
}
export default buildServer;
