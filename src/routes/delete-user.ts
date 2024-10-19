import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DeleteUserInput {
  targetId: string;
}

export async function deleteUser(app: FastifyInstance) {
  app
    .withTypeProvider()
    .get("/delete-user/:targetId", async (request, reply) => {
      try {
        const { targetId } = request.params as DeleteUserInput;

        if (!targetId) {
          return reply.code(400).send({ message: "User ID is required" });
        }

        const hasUser = await prisma.users.findUnique({
          where: {
            id: targetId,
          },
        });

        if (!hasUser) {
          return reply.code(404).send({ message: "Not user found" });
        }

        await prisma.users.deleteMany({
          where: { id: targetId },
        });

        reply.send({ message: "User successfully removed" });
      } catch (error) {
        console.error("Error deleting user:", error);
        return reply.code(500).send({ message: "Internal server error" });
      }
    });
}
