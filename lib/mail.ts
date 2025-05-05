import nodemailer from 'nodemailer';

// Define the shape of the email data
export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Create a transporter with Hostinger SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Hostinger SMTP server
  port: 465,
  secure: true,
  auth: {
    user: 'info@yeguada-agrado.es',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to generate HTML for the confirmation email sent to the user
export function generateUserEmailHTML(data: EmailData) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de mensaje - Yeguada Agrado</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #1d3557;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .footer {
          background-color: #e5e5e5;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .gold-accent {
          color: #d4af37;
        }
        .footer-links {
          margin-top: 10px;
          font-size: 11px;
        }
        .footer-links a {
          color: #1d3557;
          text-decoration: none;
          margin: 0 10px;
        }
        .footer-links a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://yeguada-agrado.es/logo-white.jpg" alt="Yeguada Agrado" class="logo">
      </div>
      <div class="content">
        <h2>Confirmación de mensaje</h2>
        <p>Hola <strong>${data.name}</strong>,</p>
        <p>Gracias por ponerte en contacto con Yeguada Agrado. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
        
        <h3 class="gold-accent">Resumen de tu mensaje:</h3>
        <p><strong>Asunto:</strong> ${data.subject}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
        
        <p>Si necesitas cualquier información adicional, no dudes en contactarnos.</p>
        <p>Saludos cordiales,<br>El equipo de <strong>Yeguada Agrado</strong></p>
      </div>
      <div class="footer">
        <p>Yeguada Agrado | Carretera M507, km. 20, 500 | 28620 Aldea del Fresno, Madrid</p>
        <p>Teléfono: +34 616 05 39 04 | Email: info@yeguada-agrado.es</p>
        <div class="footer-links">
          <a href="https://yeguada-agrado.es/politica-privacidad">Política de Privacidad</a> | 
          <a href="https://yeguada-agrado.es/legal">Aviso Legal</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Function to generate HTML for the notification email sent to Yeguada Agrado
export function generateAdminEmailHTML(data: EmailData) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo mensaje de contacto - Yeguada Agrado</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #1d3557;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .message-details {
          background-color: white;
          padding: 15px;
          border-left: 4px solid #d4af37;
          margin: 15px 0;
        }
        .footer {
          background-color: #e5e5e5;
          padding: 15px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://yeguada-agrado.es/logo-white.jpg" alt="Yeguada Agrado" class="logo">
      </div>
      <div class="content">
        <h2>Nuevo mensaje de contacto</h2>
        <p>Se ha recibido un nuevo mensaje desde el formulario de contacto de la web:</p>
        
        <div class="message-details">
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
          <p><strong>Asunto:</strong> ${data.subject}</p>
          <p><strong>Mensaje:</strong> ${data.message}</p>
        </div>
        
        <p>Puedes responder directamente a este email para contactar con el remitente.</p>
      </div>
      <div class="footer">
        <p>Este es un mensaje automático del sistema de contacto de Yeguada Agrado.</p>
      </div>
    </body>
    </html>
  `;
}

// Main function to send emails
export async function sendContactEmail(data: EmailData) {
  try {
    // Translate subject selection to readable text
    let subjectText = 'Consulta General';
    switch (data.subject) {
      case 'info':
        subjectText = 'Información General';
        break;
      case 'cria':
        subjectText = 'Servicios de Cría';
        break;
      case 'doma':
        subjectText = 'Servicios de Doma';
        break;
      case 'visita':
        subjectText = 'Solicitud de Visita';
        break;
      default:
        subjectText = 'Otro: ' + data.subject;
    }
    
    // Format data for email templates
    const emailData = {
      ...data,
      subject: subjectText
    };

    // Send confirmation email to the user
    await transporter.sendMail({
      from: '"Yeguada Agrado" <info@yeguada-agrado.es>',
      to: data.email,
      subject: 'Confirmación de mensaje - Yeguada Agrado',
      html: generateUserEmailHTML(emailData),
    });

    // Send notification email to Yeguada Agrado
    await transporter.sendMail({
      from: '"Formulario Web" <info@yeguada-agrado.es>',
      to: 'info@yeguada-agrado.es',
      replyTo: data.email,
      subject: `Nuevo mensaje: ${subjectText}`,
      html: generateAdminEmailHTML(emailData),
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}