import express from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
// import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/v1',authRouter);

export default app;
