import express from "express";
import apiRoutes from "../src/routes/index.js";

const app = express();

app.use("/api/v1", apiRoutes);

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
const port = 4322;
const run = async () => {
  try {
    app.listen(port, () => {
      console.log(
        `Server is listening on ${
          process.env.NODE_ENV === "dev" ? "http://localhost:" : "port "
        }${port}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

run();
