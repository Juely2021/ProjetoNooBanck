import mongoose from "mongoose";

export default function connectMongoDB(databaseURI){
    mongoose.connect(databaseURI)
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida com sucesso');
    })
    .catch((err) => {
      console.error('Erro na conexão com o MongoDB:', err);
    });
}