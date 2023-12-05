require("dotenv").config();
import app from "./app";
import mongoConnect from "./utils/db";

const PORT = process.env.PORT || 8080;
(async () => {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      console.log(`Listening: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server error", (error as Error).message);
  }
})();
