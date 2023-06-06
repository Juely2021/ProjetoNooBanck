import express from "express";

import {Conta} from "../database/model/Conta.js";
import { Usuario } from "../database/model/Usuario.js";
import { ulid } from "ulid";

const usuarioRouter = express()

usuarioRouter.get('/usuarios', async(req, res) => {
  const todos_os_usuarios = await Usuario.find()
    res.status(200).json(todos_os_usuarios)
})

usuarioRouter.post('/usuarios', async(req, res) => {
    try{
      
      
  const newUsuario = new Usuario({
      nome: req.body.nome,
      cpf: req.body.cpf,
      chave: req.body.chave,
      telefone: req.body.telefone
    });
  
  // Salvar o novo usuário no banco de dados
  await newUsuario.save();

  const usuarioId = newUsuario._id

  const agencia = Math.floor(Math.random() * 1000).toString()
  const conta = ulid().toString()

  const novaConta = new Conta({

    usuario: usuarioId,

    nome: req.body.nome,

    chave: req.body.chave,

    agencia: agencia,

    conta: conta,

    saldo: 20

  })

  await novaConta.save();

  res.status(201).json({message:'Usuário incluído com sucesso'});
  }

  catch (err) {
    if (err) {
      console.error('Erro ao salvar o usuário:', err);
      res.status(500).send('Erro ao salvar o usuário');
      return;
    }
    
  }})

  usuarioRouter.delete('/usuario/:id/delete', async(req, res) => {
    const usuarioId = req.params.id
    const usuarioDeletado = await Usuario.findByIdAndDelete(usuarioId)

    if (!usuarioDeletado) {
      return res.status(404).json({error:"Usuário não encontrado!"})
    }

    await Conta.deleteOne({
      usuario: usuarioId
    })

    res.status(200).json({message:"Usuário e contas deletados com sucesso!"})
  })

export default usuarioRouter

