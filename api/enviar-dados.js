// NOVO CÓDIGO PARA TAMBÉM ENVIAR PRO MEU E-MAIL 

const { MongoClient } = require('mongodb');
const enviarEmail = require('./enviar-email'); // Importe a função enviarEmail

async function conectarAoMongoDB(req) { // Adicione o parâmetro 'req' aqui
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


module.exports = async (req, res) => {
  try {
    await conectarAoMongoDB(req);

    // Chama a função enviarEmail passando os dados do formulário no objeto req.body
    const resultadoEnvioEmail = await enviarEmail(req.body);

    // Verifica se o email foi enviado com sucesso e envia a resposta para o cliente
    if (resultadoEnvioEmail.success) {
      res.status(200).send('Dados do formulário recebidos, inseridos no MongoDB e email enviado com sucesso!');
    } else {
      res.status(500).send('Ocorreu um erro ao processar a solicitação.');
    }
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).send('Ocorreu um erro ao processar a solicitação');
  }
};

