import { FastifyInstance } from "fastify";

export async function helloWorld(app: FastifyInstance) {
  app.withTypeProvider().get("/", (request, reply) => {
    reply.send({ message: "Hello World" });
  });
}
