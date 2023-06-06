import express from "express";

import {Conta} from "../database/model/Conta.js";
import { Usuario } from "../database/model/Usuario.js";

const contasRoutes = express()

contasRoutes.get("/contas", async(req, res)=> {
    const todas_as_contas = await Conta.find()
    res.status(200).json(todas_as_contas)
})

contasRoutes.get("/teste", async(req, res)=> {
    res.status(200).json({
        'nome': 'Juely Menezes',
        'cpf': '8938987'
    })
})

contasRoutes.put("/usuario/:id/pix/:chave", async(req, res)=> {
    const usuarioId = req.params.id
    const usuario = await Conta.findOne(
        {usuario:usuarioId},
        {$inc: {saldo: -req.body.saldo}}
    )
    if(!usuario) {
        return res.status.apply(404).json({message:"Usuário não encontrado!"})
    }

    const chavePix = req.params.chave
    const conta_do_beneficiado = await Conta.findOneAndUpdate(
        {chave: chavePix},
        {$inc: {saldo: req.body.saldo}},
        {new: true}
)

if(!conta_do_beneficiado) {
    return res.status.apply(404).json({message:"Conta não encontrada!"})
}

res.json({conta_do_beneficiado})

    res.status(200).json(todas_as_contas)
})

export default contasRoutes