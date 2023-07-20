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
        user: "joao.silva@radarbetsmail.cloud", // Substitua pelo seu email de origem
        pass: "Duca@2783", // Substitua pela senha gerada para o seu email de origem
      },
    });

    // Configuração do email
    const info = await transporter.sendMail({
      from: `"Concierge" <joao.silva@radarbetsmail.cloud>`,
      to: "contato@victorleao.dev.br",
      subject: dadosFormulario.emailSubject,
      text: `Nome: ${dadosFormulario.fullName}\nTelefone: ${dadosFormulario.mobileNumber}\nMensagem: ${dadosFormulario.message}`,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Email enviado com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    return { success: false, message: "Ocorreu um erro ao enviar o email." };
  }
}

module.exports = enviarEmail;
