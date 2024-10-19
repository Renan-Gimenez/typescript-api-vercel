import { FastifyInstance } from "fastify";

export async function ping(app: FastifyInstance) {
  app.withTypeProvider().get("/ping", (request, reply) => {
    reply.send({ message: "pong" });
  });
}
