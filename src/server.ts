import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import swagger from "@fastify/swagger";
import fastifyJwt, { JWT } from "@fastify/jwt";
import swaggerUi from "@fastify/swagger-ui";
import userRoutes from "./modules/user/user.route";

/*declare module 'fastify' {
    interface FastifyInstance {
      config: {
        confKey: 'config',
        PORT: number
      };
    }
}*/

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  const server = Fastify({ logger: true });

  // configs
  // server.register(fastifyEnv, options).ready()

  // register jwt- json web token
  server.register(fastifyJwt, { secret: "sadadadda" });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  // swagger initialze
  server.register(swagger);
  server.register(swaggerUi, {
    routePrefix: "/docs",
  });

  server.register(userRoutes, { prefix: "api/users" });

  return server;
}
export default buildServer;
