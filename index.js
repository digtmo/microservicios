import { Resend } from "resend"
import express from "express"
import cors from "cors"
const app = express()
const port = process.env.PORT ?? 8080;
app.use(express.json());
const resend = new Resend('re_TWojZGvg_DnzmLX99RzHeTKxKjgSp4Wez');


 app.post('/v1/enviarcorreo', async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    let resultado = await enviarEmail(firstName, lastName, email, phoneNumber, message);
    try {
        if (resultado) {
            res.status(200).json({ success: true }); // Enviar un objeto JSON de éxito
        } else {
            res.status(400).json({ success: false }); // Enviar un objeto JSON de error
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Enviar un objeto JSON de error con detalles
    }
});  

async function enviarEmail(firstName, lastName, email, phoneNumber, message) {
  try {
     await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ["davidtorresim@gmail.com"],
      subject: 'Nuevo Contacto digtmo.cl',
      html: `<strong>Se ha generado un nuevo contacto, con nombre ${firstName} ${lastName}, correo ${email}, numero ${phoneNumber}. El mensaje es el siguiente: ${message}</strong>`
    });

    return true
  } catch (error) {
    console.error(error);
    return false
  }
  
}



app.listen(port, () => {
  console.log('ok');
});
