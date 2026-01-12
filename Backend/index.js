import express from "express";
// import data from "./data.js";
import connectToDB from "./db/connect.js";
import "dotenv/config";

import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/Auth.js";
import cors from "cors";
import adminRouter from "./routes/Admin.js";
import checkRouter from "./routes/Check.js";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/Cart.js";
import couponRouter from "./routes/Coupon.js";
import categoryRouter from "./routes/categoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"
import chatRouter from "./routes/Chat.js";
const app = express();
app.use(express.json());
app.use(cookieParser())
await connectToDB();
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use("/product", productRouter);
app.use("/user", authRouter);
app.use("/admin",adminRouter)

app.use("/check", checkRouter)
app.use("/cart", cartRouter)
app.use("/coupon", couponRouter)
app.use("/category", categoryRouter);
app.use("/api/ai", aiRoutes)
app.use('/chat', chatRouter)

app.listen(3000, () => console.log("Server started at port 3000"));






