const express = require("express");
const cookieParser = require("cookie-parser"); // lecture cookie
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();
// app.use(cors()); // tout le monde peut faire des requêtes

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // lecture des cookies

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id);
});
// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
