import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Función para guardar mensaje en archivo JSON (respaldo)
async function saveMessageToFile(data: ContactFormData) {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  const messagesFile = path.join(dataDir, "messages.json");

  try {
    // Crear directorio si no existe
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Leer mensajes existentes
    let messages: any[] = [];
    if (fs.existsSync(messagesFile)) {
      const content = fs.readFileSync(messagesFile, "utf-8");
      messages = JSON.parse(content);
    }

    // Agregar nuevo mensaje
    messages.push({
      ...data,
      timestamp: new Date().toISOString(),
      read: false,
    });

    // Guardar
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    return true;
  } catch (err) {
    console.error("Error guardando mensaje en archivo:", err);
    return false;
  }
}

// Configuración del transporter
const getTransporter = () => {
  // Usar variables de entorno para configuración SMTP
  // Puedes usar servicios como Gmail, SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "contacto@dmcprojects.cl";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic: "salud" | "textil" | "general";
  message: string;
  garment?: string;
  quantity?: string;
}

export async function POST(request: NextRequest) {
  let data: ContactFormData;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Datos inválidos" },
      { status: 400 }
    );
  }

  // Validación básica
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json(
      { success: false, error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return NextResponse.json(
      { success: false, error: "Email inválido" },
      { status: 400 }
    );
  }

  // Siempre guardar el mensaje en archivo (respaldo)
  await saveMessageToFile(data);

  try {
    // Determinar el asunto según el tema
    const topicLabels = {
      salud: "Integración de Sistemas de Salud",
      textil: "Cotización Impresión DTF",
      general: "Consulta General",
    };

    const subject = `[DMC Projects] ${topicLabels[data.topic]} - ${data.name}`;

    // Construir el cuerpo del email en HTML
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${data.topic === "salud" ? "#10b981" : data.topic === "textil" ? "#ff0040" : "#3b82f6"}; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
          .value { margin-top: 4px; }
          .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid ${data.topic === "salud" ? "#10b981" : data.topic === "textil" ? "#ff0040" : "#3b82f6"}; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">Nuevo mensaje de contacto</h2>
            <p style="margin:5px 0 0 0;opacity:0.9;">${topicLabels[data.topic]}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Teléfono</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ` : ""}
            ${data.company ? `
            <div class="field">
              <div class="label">${data.topic === "salud" ? "Institución" : "Empresa"}</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ""}
            ${data.topic === "textil" && data.garment ? `
            <div class="field">
              <div class="label">Tipo de Prenda</div>
              <div class="value">${data.garment}</div>
            </div>
            ` : ""}
            ${data.topic === "textil" && data.quantity ? `
            <div class="field">
              <div class="label">Cantidad Aproximada</div>
              <div class="value">${data.quantity}</div>
            </div>
            ` : ""}
            <div class="field">
              <div class="label">Mensaje</div>
              <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de DMC Projects.</p>
              <p>Fecha: ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Texto plano como fallback
    const textBody = `
Nuevo mensaje de contacto - ${topicLabels[data.topic]}

Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ""}
${data.company ? `${data.topic === "salud" ? "Institución" : "Empresa"}: ${data.company}` : ""}
${data.topic === "textil" && data.garment ? `Tipo de Prenda: ${data.garment}` : ""}
${data.topic === "textil" && data.quantity ? `Cantidad: ${data.quantity}` : ""}

Mensaje:
${data.message}

---
Enviado desde el formulario de contacto de DMC Projects
${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}
    `.trim();

    // Verificar si SMTP está configurado
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // En desarrollo sin SMTP, guardar en archivo local
      console.log("=== NUEVO MENSAJE DE CONTACTO ===");
      console.log(textBody);
      console.log("================================");

      // Retornar éxito para desarrollo
      return NextResponse.json({
        success: true,
        message: "Mensaje recibido correctamente. Te contactaremos pronto.",
        debug: process.env.NODE_ENV === "development" ? "Email logged to console (SMTP not configured)" : undefined,
      });
    }

    // Enviar email
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"DMC Projects Web" <${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: RECIPIENT_EMAIL,
      subject,
      text: textBody,
      html: htmlBody,
    });

    // Enviar copia al remitente (confirmación)
    await transporter.sendMail({
      from: `"DMC Projects" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Recibimos tu mensaje - DMC Projects`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0a0a0a; color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
            .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0;font-size:24px;">DMC Projects</h1>
              <p style="margin:10px 0 0 0;opacity:0.8;">Gracias por contactarnos</p>
            </div>
            <div class="content">
              <p>Hola <strong>${data.name}</strong>,</p>
              <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>

              <div class="highlight">
                <p style="margin:0;font-size:14px;color:#6b7280;">Tu mensaje:</p>
                <p style="margin:10px 0 0 0;">${data.message.replace(/\n/g, "<br>")}</p>
              </div>

              <p>Mientras tanto, puedes contactarnos directamente por WhatsApp para una respuesta más rápida:</p>
              <p style="text-align:center;">
                <a href="https://wa.me/56942287787" style="display:inline-block;padding:12px 24px;background:#25D366;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
                  Escribir por WhatsApp
                </a>
              </p>

              <div class="footer">
                <p>DMC Projects - Conectamos sistemas de salud e imprimimos tu identidad</p>
                <p>Santiago, Chile | +56 9 4228 7787 | contacto@dmcprojects.cl</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente. Revisa tu email para la confirmación.",
    });
  } catch (error: any) {
    console.error("Error al enviar email:", error);

    // El mensaje ya fue guardado en archivo al inicio, así que retornamos éxito
    console.log("Mensaje guardado en archivo (SMTP falló)");
    return NextResponse.json({
      success: true,
      message: "Mensaje recibido correctamente. Te contactaremos pronto.",
    });
  }
}
