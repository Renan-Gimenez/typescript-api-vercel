import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(app: FastifyInstance) {
  app.withTypeProvider().get("/get-users", async (request, reply) => {
    try {
      const users = await prisma.users.findMany();

      if (users.length === 0) {
        return reply.send({ message: "No users found" });
      }

      reply.send(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return reply.code(500).send({ message: "Internal server error" });
    }
  });
}
