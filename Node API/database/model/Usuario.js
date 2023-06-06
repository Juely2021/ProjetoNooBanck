import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    chave: {type: String, required: true, unique: true},
    telefone: {type: String, required: true, unique: true}
})

const Usuario = mongoose.model("Usuario", usuarioSchema)

export {Usuario}