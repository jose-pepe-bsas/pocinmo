const {transporter} = require('../_MailerConfig/nodemailer');

const sendVerificationEmail = async (email, fullname, token) => {
  const verificationUrl = `${process.env.URL}/verificacion-email?key_verification=${token}`;

  const mailOptions = {
    from: process.env.NAME_EMAIL,
    to: email,
    subject: 'Verificación de correo electrónico',
    text: `Hola ${fullname}, por favor verifica tu correo electrónico usando el siguiente enlace: ${verificationUrl}`,
    html: `
         <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo - Inmobiler</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
        font-size: 24px;
        margin-bottom: 10px;
      }
      h2 {
        color: #4CAF50;
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 15px;
      }
      p {
        color: #555555;
        font-size: 16px;
        line-height: 1.5;
      }
      .button {
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
        text-align: center;
      }
      .button:hover {
        background-color: #45a049;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
      .footer a {
        color: #4CAF50;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
      .service-info {
        background-color: #f1f1f1;
        padding: 15px;
        border-radius: 8px;
        margin-top: 25px;
      }
      .service-info h3 {
        color: #333333;
        font-size: 18px;
      }
      .service-info p {
        color: #555555;
        font-size: 14px;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
  
    <div class="container">
      <h1>¡Hola, ${fullname}!</h1>
      <p>Gracias por registrarte en <strong>Inmobiler</strong>, la plataforma donde puedes publicar propiedades o servicios relacionados, como electricistas, fontaneros y más.</p>
      
      <h2>¡Tu cuenta está casi lista!</h2>
      <p>Para completar tu registro y comenzar a publicar, por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <a href="${verificationUrl}" class="button">Verificar mi correo</a>
  
      <p>Si no puedes hacer clic en el enlace, copia y pega la siguiente URL en tu navegador:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
  
      <div class="service-info">
        <h3>Publica Propiedades o Servicios</h3>
        <p>Con Inmobiler, puedes publicar propiedades para alquilar o vender, o incluso ofrecer servicios como:</p>
        <ul>
          <li>Electricistas</li>
          <li>Fontaneros</li>
          <li>Servicios de mantenimiento</li>
          <li>Y muchos más...</li>
        </ul>
        <p>Haz crecer tu negocio o encuentra lo que necesitas a través de nuestra plataforma.</p>
      </div>
  
      <div class="footer">
        <p>Si no te has registrado, por favor ignora este mensaje.</p>
        <p>Gracias por ser parte de Inmobiler.</p>
      </div>
    </div>
  
  </body>
  </html>
  
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de verificación enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar correo de verificación:', error);
    if (error.responseCode === 535) {
      console.error(
        'Problema de autenticación. Revisa las credenciales de tu correo o la contraseña de aplicación.'
      );
    } else {
      console.error('Error desconocido:', error);
    }
    throw new Error('No se pudo enviar el correo de verificación');
  }
};

module.exports = {sendVerificationEmail};
