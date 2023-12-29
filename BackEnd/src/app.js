import express from "express";
import apiRoutes from "../src/routes/index.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    // origin: ["http://localhost:5173/*"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  })
);
//option??

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use((req, res, next) => {
  console.info(`Processing ${req.method} request to ${req.path}`);
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
      console.info(
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
