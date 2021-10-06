import server from "./api/server.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

server.listen(port, () =>
  console.log(`
  --------------------------------------------------------------
            Server is live on http://localhost:${port}
  --------------------------------------------------------------
    `)
);
