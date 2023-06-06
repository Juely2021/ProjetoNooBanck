// import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectMongoDB from "./database/connect.js";
// import contatoRouter from "./routes/contato.routes.js";
import usuarioRouter from "./routes/usuarios.routes.js";
import contasRoutes from "./routes/contas.routes.js";

dotenv.config()

const databaseURI = process.env.MONGODB_URI;

const app = express()
// const app = require('express')
connectMongoDB(databaseURI)

app.use(express.json());
app.use(cors("*"));

// app.use(contatoRouter)
app.use(usuarioRouter)
app.use(contasRoutes)

app.listen("3500", ()=> console.log("Servidor rodando na porta 3500"))