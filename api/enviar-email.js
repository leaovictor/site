// "use strict";
// const nodemailer = require("nodemailer");

// // Função para enviar o e-mail
// async function enviarEmail(dadosFormulario) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.hostinger.com.br",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "joao.silva@radarbetsmail.cloud", // Substitua pelo seu email de origem
//         pass: "Duca@2783", // Substitua pela senha gerada para o seu email de origem
//       },
//     });

//     // Configuração do email
//     const info = await transporter.sendMail({
//       from: `"Concierge" <joao.silva@radarbetsmail.cloud>`,
//       to: "contato@victorleao.dev.br",
//       subject: dadosFormulario.emailSubject,
//       text: `Nome: ${dadosFormulario.fullName}\nTelefone: ${dadosFormulario.mobileNumber}\nMensagem: ${dadosFormulario.message}`,
//     });

//     console.log("Message sent: %s", info.messageId);
//     return { success: true, message: "Email enviado com sucesso!" };
//   } catch (error) {
//     console.error("Erro ao enviar o email:", error);
//     return { success: false, message: "Ocorreu um erro ao enviar o email." };
//   }
// }

// module.exports = enviarEmail;

"use strict";
const nodemailer = require("nodemailer");

// Função para enviar o e-mail formatado
async function enviarEmailFormatado(dadosFormulario) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com.br",
      port: 465,
      secure: true,
      auth: {
        user: "joao.silva@radarbetsmail.cloud", // Substitua pelo seu email de origem
        pass: "Duca@2783", // Substitua pela senha gerada para o seu email de origem
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
          <p>Atenciosamente,</p>
          <p>Equipe do Seu Site</p>
        </div>
      </body>
      </html>
    `;

    // Configurações do e-mail
    const mailOptions = {
      from: `"Concierge" <joao.silva@radarbetsmail.cloud>`,
      to: "contato@victorleao.dev.br",
      subject: dadosFormulario.emailSubject,
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

module.exports = enviarEmailFormatado;

