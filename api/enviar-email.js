
"use strict";
const nodemailer = require("nodemailer");

// Função para enviar o e-mail formatado
async function enviarEmailFormatado(dadosFormulario) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@victorleao.dev.br", // Substitua pelo seu email de origem
        pass: "#9Tebyqv", // Substitua pela senha gerada para o seu email de origem
      },
    });

    // Corpo do email formatado em HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova mensagem recebida</title>
        <style>
          /* Estilos CSS inline para melhor compatibilidade com clientes de e-mail */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
          }
          h1 {
            color: #007bff;
          }
          p {
            color: #333333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nova mensagem recebida!</h1>
          <p>Olá,</p>
          <p>Você recebeu uma nova mensagem através do formulário do site:</p>
          <ul>
            <li><strong>Nome:</strong> ${dadosFormulario.fullName}</li>
            <li><strong>E-mail:</strong> ${dadosFormulario.emailAddress}</li>
            <li><strong>Telefone:</strong> ${dadosFormulario.mobileNumber}</li>
            <li><strong>Assunto:</strong> ${dadosFormulario.emailSubject}</li>
          </ul>
          <p><strong>Mensagem:</strong></p>
          <p>${dadosFormulario.message}</p>
          <p>**********Fim da mensagem**********</p>
          <p>Equipe do myprogrammer</p>
        </div>
      </body>
      </html>
    `;

    // Configurações do e-mail
    const mailOptions = {
      from: `"Concierge do myprogrammer" <no-reply@victorleao.dev.br>`,
      to: "contato@victorleao.dev.br",
      subject: 'Nova mensagem de '+dadosFormulario.fullName,
      html: emailHTML, // Passando o conteúdo HTML formatado como valor da propriedade 'html'
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso:", info.messageId);
    return { success: true, message: "E-mail enviado com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    return { success: false, message: "Ocorreu um erro ao enviar o e-mail." };
  }
}

app.post('/api/enviar-dados', async (req, res) => {
  const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body;

  // Salvar os dados no MongoDB Atlas
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      return;
    }

    const db = client.db('seu-banco-de-dados');
    const collection = db.collection('contatos');

    collection.insertOne({
      fullName,
      emailAddress,
      mobileNumber,
      emailSubject,
      message,
    });

    client.close();
  });

  // Enviar e-mail formatado
  const emailResult = await enviarEmailFormatado(req.body);
  if (!emailResult.success) {
    console.error('Erro ao enviar o e-mail:', emailResult.message);
    // Aqui você pode tratar o erro do envio de e-mail, se necessário
  }

  // Redirecionar para a página de agradecimento após 5 segundos
  setTimeout(() => {
    res.redirect('/thankyou.html');
  }, 5000);
});

module.exports = enviarEmailFormatado;

// FALTA CRIAR O ALERTA DE MENSAGEM ENVIADA COM SUCESSO! e Email pro cliente

