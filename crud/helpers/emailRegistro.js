import nodemailer from "nodemailer";

const emailRegistro = async (userData) => {
  const { email, name, token } = userData;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b25456fa69221e",
      pass: "482017ff2899d6",
    },
  });

  const info = await transport.sendMail({
    from: ` "Social Media" <cuentas@socialmedia.com>`,
    to: email,
    subject: "SocialMedia - Comprueba tu Cuenta",
    text: "Comprueba tu cuenta en SocialMedia",
    html: ` <p>Hola: ${name} Comprueba tu cuenta en SocialMedia</p>
     <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
     <a href="${process.env.URL_FRONTEND}/confirm/${token}">Comprobar Cuenta</a>
     <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

const emailForgetPassword = async (datos) => {
  //extract data information of user
  const { name, token, email } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b25456fa69221e",
      pass: "482017ff2899d6",
    },
  });

  const info = await transport.sendMail({
    from: ` "SocialMedia" <cuentas@socialmedia.com>`,
    to: email,
    subject: "SocialMedia - Forgot my password",
    text: "Change my password",
    html: ` <p>Hola: ${name} cambia tu cuenta en UpTask</p>
     <p> Para cambiar tu contraseña debes entrar al siguient enlace : </p>
     <a href="${process.env.URL_FRONTEND}/change-password/${token}">Cambiar Contraseña</a>
     <p>Si tu no olvidaste el password de esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export { emailRegistro, emailForgetPassword };
