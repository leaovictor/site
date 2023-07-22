const { MongoClient } = require("mongodb");
const enviarEmail = require("./enviar-email");
const moment = require("moment-timezone");

async function conectarAoMongoDB(req) {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Conectado ao MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("contato");

    const dadosFormulario = req.body;
    const dataEnvio = moment().tz("America/Sao_Paulo").format();
    dadosFormulario.shipping = dataEnvio;

    const resultadoInsercao = await collection.insertOne(dadosFormulario);
    console.log("Dados do formulário inseridos com sucesso:", resultadoInsercao);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  } finally {
    await client.close();
    console.log("Conexão com o MongoDB encerrada");
  }
}

module.exports = async (req, res) => {
  try {
    await conectarAoMongoDB(req);

    const resultadoEnvioEmail = await enviarEmail(req.body);

    if (resultadoEnvioEmail.success) {
      res.status(200).send("Dados do formulário recebidos, inseridos no MongoDB e email enviado com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação.");
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.status(500).send("Ocorreu um erro ao processar a solicitação");
  }

  // Redirecionar para a página de agradecimento após o envio do formulário
  res.redirect('../thankyou.html');
};
