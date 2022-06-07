import express from "express";
import { promises as fs } from "fs";
import mongoose, { Model, Schema } from "mongoose";

import { RegisterRoutes } from "./routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

RegisterRoutes(app);
