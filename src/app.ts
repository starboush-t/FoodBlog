import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import multer from "multer";

import recpieRouter from "./routes/recipe";

const app = express();

const mongoDB_URI = `mongodb+srv://starboush:ldFthYlKEJ1rpAzN@cluster0.kq3opj4.mongodb.net/recipe?retryWrites=true&w=majority`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "dist/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: Function) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "dist/views");

mongoose.set("strictQuery", true);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookieBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use(recpieRouter);

mongoose
  .connect(mongoDB_URI)
  .then((connect) => {
    console.log("Database connected successfully");
  })
  .then((connect) => {
    app.listen(5000, () => {
      console.log("Server running at http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
