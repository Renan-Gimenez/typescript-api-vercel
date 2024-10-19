import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserInput {
  username: string;
  email: string;
}

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider().post("/create-user", async (request, reply) => {
    try {
      const { username, email } = request.body as CreateUserInput;

      if (!username || !email) {
        return reply.code(400).send({
          message: "Both username and email are required",
        });
      }

      if (!username.trim() || !email.trim()) {
        return reply.code(400).send({
          message: "Both username and email cannot be empty",
        });
      }

      const existingUsername = await prisma.users.findUnique({
        where: { username: username },
      });

      if (existingUsername) {
        return reply.code(409).send({ message: "Username already in use" });
      }

      const existingEmail = await prisma.users.findUnique({
        where: { email: email },
      });

      if (existingEmail) {
        return reply.code(409).send({ message: "Email already in use" });
      }

      const newuser = await prisma.users.create({
        data: {
          username: username,
          email: email,
        },
      });

      reply.status(201).send(newuser);
    } catch (error: any) {
      console.error("Error creating user:", error);
      return reply.code(500).send({ message: "Internal server error" });
    }
  });
}
