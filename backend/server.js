import 'dotenv/config';
import { createApp } from './src/app.js';
import { connectDb } from './src/db/connect.js';

const PORT = process.env.PORT || 4000;

async function main() {
  await connectDb(process.env.MONGO_URI);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
