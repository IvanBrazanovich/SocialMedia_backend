import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./crud/routes/authRoutes.js";
import postRoutes from "./crud/routes/postRoutes.js";
import utilsRoutes from "./crud/routes/utilsRoutes.js";
import conectarDB from "./crud/config/db.js";

// Dotenv
dotenv.config();

//Create app
const app = express();

// Be able to use json
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Be able to change the port
const PORT = process.env.PORT || 4000;

//Connect with database
conectarDB();

//fix cors
const whitelist = [`${process.env.URL_FRONTEND}`];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Conectar to server
app.listen(PORT, () => {});

//Routes
app.use("/api/usuarios", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/utils", utilsRoutes);
