import path from "path"; // always in the top.
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config(); //it's important that you call that above where you use any of those environment variables⬇️⬇️
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
//----------------------------------------------------------------
const port = process.env.PORT || 5000;
connectDB(); // connect to MongoDB
const app = express();
//----------------------------------------------------------------
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------------------------------------------------------
//Cookie parser middleware
app.use(cookieParser());
//----------------------------------------------------------------
// app.get("/", (req, res) => {
//   res.send("Welcome from backend");
// });
//----------------------------------------------------------------
app.use("/api/products", productRoutes); //So any time we hit this route, no matter what is after it, it's going to go to this file product routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
//----------------------------------------------------------------
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
//----------------------------------------------------------------
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//----------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//----------------------------------------------------------------
app.use(notFound);
app.use(errorHandler);
//----------------------------------------------------------------
app.listen(port, () => console.log(`server running on port ${port}`));
