import { fastify } from "fastify";

import { helloWorld, ping } from "./routes";

const app = fastify();

app.register(helloWorld);
app.register(ping);

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${PORT}`);
});
