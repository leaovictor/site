const { MongoClient } = require("mongodb");
const enviarEmail = require("./enviar-email"); // Importe a função enviarEmail
const moment = require('moment-timezone');

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
      const dataEnvio = moment().tz('America/Sao_Paulo').format();

      dadosFormulario.shipping = dataEnvio;

    // Inserir os dados na coleção
    const resultadoInsercao = await collection.insertOne(dadosFormulario);

    console.log(
      "Dados do formulário inseridos com sucesso:",
      resultadoInsercao
    );

    // Redirecionar para a página de agradecimento após o envio do formulário
    res.redirect('/thankyou.html');
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    res.status(500).send("Ocorreu um erro ao processar a solicitação");
  } finally {
    await client.close();
    console.log("Conexão com o MongoDB encerrada");
  }
}

module.exports = async (req, res) => {
  try {
    await conectarAoMongoDB(req);

    // Chama a função enviarEmail passando os dados do formulário no objeto req.body
    const resultadoEnvioEmail = await enviarEmail(req.body);

    // Verifica se o email foi enviado com sucesso e envia a resposta para o cliente
    if (resultadoEnvioEmail.success) {
      // Nenhuma resposta é enviada aqui, pois o redirecionamento já ocorreu antes
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação.");
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.status(500).send("Ocorreu um erro ao processar a solicitação");
  }
};
