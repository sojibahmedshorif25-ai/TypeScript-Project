import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/db";

async function start() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });
}

start().catch(console.error);
