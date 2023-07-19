// const { MongoClient } = require('mongodb');

// async function conectarAoMongoDB(req) { // Adicione o parâmetro 'req' aqui
//   const uri = process.env.MONGODB_URI;
//   const dbName = process.env.MONGODB_DB;

//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log('Conectado ao MongoDB');

//     const db = client.db(dbName);

//     const collection = db.collection('contato'); // Substitua 'nome-da-colecao' pelo nome da coleção que deseja usar

//     const dadosFormulario = req.body; // Supondo que os dados do formulário estejam disponíveis no objeto req.body

//     // Inserir os dados na coleção
//     const resultadoInsercao = await collection.insertOne(dadosFormulario);

//     console.log('Dados do formulário inseridos com sucesso:', resultadoInsercao);
//   } catch (error) {
//     console.error('Erro ao conectar ao MongoDB:', error);
//   } finally {
//     await client.close();
//     console.log('Conexão com o MongoDB encerrada');
//   }
// }

// module.exports = async (req, res) => {
//   try {
//     await conectarAoMongoDB(req); // Passe o objeto 'req' como argumento para a função
//     res.status(200).send('Dados do formulário recebidos e inseridos no MongoDB com sucesso!');
//   } catch (error) {
//     console.error('Erro ao processar a solicitação:', error);
//     res.status(500).send('Ocorreu um erro ao processar a solicitação');
//   }
// };


// NOVO CÓDIGO PARA TAMBÉM ENVIAR PRO MEU E-MAIL 

const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

async function conectarAoMongoDB(req) {
  // Código para conexão com o MongoDB
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado ao MongoDB');

    const db = client.db(dbName);

    const collection = db.collection('contato'); // Substitua 'nome-da-colecao' pelo nome da coleção que deseja usar

    const dadosFormulario = req.body; // Supondo que os dados do formulário estejam disponíveis no objeto req.body

    // Inserir os dados na coleção
    const resultadoInsercao = await collection.insertOne(dadosFormulario);

    console.log('Dados do formulário inseridos com sucesso:', resultadoInsercao);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  } finally {
    await client.close();
    console.log('Conexão com o MongoDB encerrada');
  }
}

async function enviarEmail(dadosFormulario) {
  // Configuração do Nodemailer para enviar o email
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Aqui você pode usar o serviço de email de sua preferência
    auth: {
      user: 'leaovic@gmail.com', // Coloque o email de origem aqui
      pass: '{!False}', // Coloque a senha do email de origem aqui
    },
  });

  // Opções do email
  const mailOptions = {
    from: 'leaovic@gmail.com', // Coloque o email de origem aqui
    to: 'contato@victorleao.dev.br', // Coloque o email do destinatário aqui
    subject: 'Novo formulário de contato recebido',
    text: JSON.stringify(dadosFormulario), // Aqui você pode personalizar o corpo do email com os dados do formulário
  };

  // Envio do email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Erro ao enviar o email:', error);
    } else {
      console.log('Email enviado com sucesso:', info.response);
    }
  });
}

module.exports = async (req, res) => {
  try {
    await conectarAoMongoDB(req);
    await enviarEmail(req.body); // Chama a função enviarEmail passando os dados do formulário
    res.status(200).send('Dados do formulário recebidos, inseridos no MongoDB e email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).send('Ocorreu um erro ao processar a solicitação');
  }
};
