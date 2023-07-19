"use strict";
const nodemailer = require("nodemailer");

// Função para enviar o e-mail
async function enviarEmail(dadosFormulario) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com.br",
      port: 465,
      secure: true,
      auth: {
        user: 'joao.silva@radarbetsmail.cloud', // Substitua pelo seu email de origem
        pass: 'Duca@2783' // Substitua pela senha gerada para o seu email de origem
      }
    });

    // Configuração do email
    const info = await transporter.sendMail({
      from: `"Fred Foo 👻" <joao.silva@radarbetsmail.cloud>`, // Substitua pelo email de origem
      to: "leaovic@gmail.com", // Substitua pelos emails de destino separados por vírgula
      subject: dadosFormulario.emailSubject, // Assunto do email vindo do formulário
      text: dadosFormulario.message, // Corpo do email vindo do formulário
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: 'Email enviado com sucesso!' };
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    return { success: false, message: 'Ocorreu um erro ao enviar o email.' };
  }
}

module.exports = enviarEmail;
