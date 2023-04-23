"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const multer_1 = __importDefault(require("multer"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const app = (0, express_1.default)();
const mongoDB_URI = `mongodb+srv://starboush:ldFthYlKEJ1rpAzN@cluster0.kq3opj4.mongodb.net/recipe?retryWrites=true&w=majority`;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "dist/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.set("view engine", "ejs");
app.set("views", "dist/views");
mongoose_1.default.set("strictQuery", true);
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: false }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use((0, cookie_parser_1.default)("CookingBlogSecure"));
app.use((0, express_session_1.default)({
    secret: "CookieBlogSecretSession",
    saveUninitialized: true,
    resave: true,
}));
app.use((0, connect_flash_1.default)());
app.use(recipe_1.default);
mongoose_1.default
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
//# sourceMappingURL=app.js.map