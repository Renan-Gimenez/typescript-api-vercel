import { fastify } from "fastify";

const app = fastify();

app.get("/", (request, reply) => {
  reply.send({ message: "Hello World" });
});

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${PORT}`);
});
