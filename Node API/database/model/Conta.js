import mongoose from "mongoose";

const contaSchema = new mongoose.Schema({
    usuario: {
        type:mongoose.Types.ObjectId,
        ref:"Usuario",
        required: true
    },

    nome: {type: String, required: true},

    chave: {type: String, required: true, unique: true},

    agencia: {
        type: String
    },

    conta: {
        type: String
    },

    saldo: {
        type: Number,
        default: 0
    }
})

const Conta = mongoose.model("Conta", contaSchema)

export {Conta}