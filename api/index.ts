// All required import
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./config";
import categoryRoute from "./routes/categories";
import subCategoryRoute from "./routes/subcategories";

// Middleware
app.use(express.json());

// Upload file

// Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
