const {transporter} = require('../_MailerConfig/nodemailer');

const sendRecoveryEmail = async (email, fullname, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🔒 Código de recuperación de tu cuenta',
    html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Código de Recuperación</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              text-align: center;
              padding: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              color: #333333;
            }
            .content p {
              font-size: 16px;
              line-height: 1.5;
            }
            .verification-code {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              padding: 10px 20px;
              font-size: 24px;
              border-radius: 5px;
              margin: 20px 0;
              text-align: center;
            }
            .button {
              display: block;
              text-align: center;
              margin-top: 20px;
            }
            .button a {
              background-color: #28a745;
              color: #ffffff;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              background-color: #f4f4f4;
              color: #888888;
              text-align: center;
              padding: 15px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🔑 Recupera tu cuenta</h1>
            </div>
            <div class="content">
              <p>Hola ${fullname}</p>
              <p>Has solicitado un código para restablecer tu contraseña. Utiliza el siguiente código de verificación para proceder:</p>
              <div class="verification-code">${verificationCode}</div>
              <p>Este código es válido por solo 15 minutos. Si no has solicitado este código, por favor ignora este mensaje.</p>
             
            </div>
            <div class="footer">
              <p>Gracias por confiar en nosotros.</p>
              <p>© 2024 Inmobiler. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
  };

  // Enviar el correo electrónico
  await transporter.sendMail(mailOptions);
};

module.exports = {sendRecoveryEmail};
