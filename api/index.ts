// All required import
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./config";
import GlobalError from "./middelwares/GlobalError";
import ApiError from "./utils/ApiError";
// Imported Security
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import compression from "compression";
import expressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import { I18n } from "i18n";
import path from "path";
// Imported Routes
import authRoute from "./routes/auth";
import categoryRoute from "./routes/categories";
import subCategoryRoute from "./routes/subcategories";
import productRoute from "./routes/products";
import reviewRoute from "./routes/reviews";
import couponRoute from "./routes/coupons";
import favouriteRoute from "./routes/wishlists";
import addressRoute from "./routes/addresses";
import cartRoute from "./routes/carts";
import orderRoute from "./routes/orders";
import userRoute from "./routes/users";

// Todo: Modify on the express.Request (req) to accept somerhing like: {req.files, req.user}
declare module "express" {
  // You do not need to prefix with `express.` here
  interface Request {
    files?: any;
    user?: any;
    filterData?: any;
  }
}
// Todo:

// Middleware

app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:52706/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-API-KEY",
    ],
    credentials: true,
  })
);
// app.use(cookieParser());
// app.use(
//   csurf({
//     cookie: {
//       httpOnly: true,

//       sameSite: "strict",
//     },
//   })
// );

app.use(express.json({ limit: "2kb" }));

app.use(compression());
app.use(expressMongoSanitize());
app.use(hpp({ whitelist: ["price", "category", "subcategory"] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const i18n = new I18n({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);

app.use(express.static("uploads"));
// http://localhost:5000/products/product-1726081638657-coverimg.webp if you want to open the img from the browser.

// Routes
const mountRoutes = (app: express.Application) => {
  // app.use(
  //   (
  //     req: express.Request,
  //     res: express.Response,
  //     next: express.NextFunction
  //   ) => {
  //     res.cookie("cookies", req.csrfToken());
  //     next();
  //   }
  // );
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subcategories", subCategoryRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/coupons", couponRoute);
  app.use("/api/v1/favourites", favouriteRoute);
  app.use("/api/v1/addresses", addressRoute);
  app.use("/api/v1/carts", cartRoute);
  app.use("/api/v1/orders", orderRoute);
  app.all(
    "*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      return next(new ApiError(400, `the route ${req.originalUrl} not found`));
    }
  );
  app.use(GlobalError);
};
mountRoutes(app);
