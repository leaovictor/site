// const { MongoClient } = require("mongodb");
// const enviarEmail = require("./enviar-email");
// const moment = require("moment-timezone");

// async function conectarAoMongoDB(req) {
//   const uri = process.env.MONGODB_URI;
//   const dbName = process.env.MONGODB_DB;

//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log("Conectado ao MongoDB");

//     const db = client.db(dbName);
//     const collection = db.collection("contato");

//     const dadosFormulario = req.body;
//     const dataEnvio = moment().tz("America/Sao_Paulo").format();
//     dadosFormulario.shipping = dataEnvio;

//     const resultadoInsercao = await collection.insertOne(dadosFormulario);
//     console.log("Dados do formulário inseridos com sucesso:", resultadoInsercao);

//     // Chama a função enviarEmail passando os dados do formulário no objeto req.body
//     const resultadoEnvioEmail = await enviarEmail(req.body);

//     // Verifica se o email foi enviado com sucesso e envia a resposta para o cliente
//     if (resultadoEnvioEmail.success) {
//       res.status(200).send("Dados do formulário recebidos, inseridos no MongoDB e email enviado com sucesso!");
//     } else {
//       res.status(500).send("Ocorreu um erro ao enviar o e-mail.").redirect('../thankyou.html');
//     }
//   } catch (error) {
//     console.error("Erro ao processar a solicitação:", error);
//     res.status(500).send("Ocorreu um erro ao processar a solicitação");
//   } finally {
//     await client.close();
//     console.log("Conexão com o MongoDB encerrada");
//   }
// }

// NOVO CÓDIGO PARA TAMBÉM ENVIAR PRO MEU E-MAIL

const { MongoClient } = require("mongodb");
const enviarEmail = require("./enviar-email"); // Importe a função enviarEmail
const moment = require("moment-timezone");

async function conectarAoMongoDB(req) {
  // Adicione o parâmetro 'req' aqui
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Conectado ao MongoDB");

    const db = client.db(dbName);

    const collection = db.collection("contato"); // Substitua 'nome-da-colecao' pelo nome da coleção que deseja usar

    const dadosFormulario = req.body; // Supondo que os dados do formulário estejam disponíveis no objeto req.body

    // Obter a data e hora atual do envio do formulário no fuso horário de Brasília
    const dataEnvio = moment().tz("America/Sao_Paulo").format();

    dadosFormulario.shipping = dataEnvio;

    // Inserir os dados na coleção
    const resultadoInsercao = await collection.insertOne(dadosFormulario);

    console.log(
      "Dados do formulário inseridos com sucesso:",
      resultadoInsercao
    );
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  } finally {
    await client.close();
    console.log("Conexão com o MongoDB encerrada");
  }
}

module.exports = async (req, res) => {
  // Código para exibir um alerta após o envio do formulário
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio normal do formulário

      // Exibe o alerta
      alert("Formulário enviado com sucesso! Obrigado por entrar em contato.");
    });
  try {
    await conectarAoMongoDB(req);

    // Chama a função enviarEmail passando os dados do formulário no objeto req.body
    const resultadoEnvioEmail = await enviarEmail(req.body);

    // Verifica se o email foi enviado com sucesso e envia a resposta para o cliente
    if (resultadoEnvioEmail.success) {
      res
        .status(200)
        .send(
          "Dados do formulário recebidos, inseridos no MongoDB e email enviado com sucesso!"
        );
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação.");
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.status(500).send("Ocorreu um erro ao processar a solicitação");
  }
};
