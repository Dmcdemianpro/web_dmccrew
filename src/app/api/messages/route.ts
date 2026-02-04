import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const getMessagesPath = () => {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  return path.join(dataDir, "messages.json");
};

// GET - Obtener todos los mensajes
export async function GET() {
  try {
    const messagesPath = getMessagesPath();

    if (!fs.existsSync(messagesPath)) {
      return NextResponse.json({ messages: [] });
    }

    const content = fs.readFileSync(messagesPath, "utf-8");
    const messages = JSON.parse(content);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error al leer mensajes:", error);
    return NextResponse.json({ messages: [] });
  }
}

// PATCH - Marcar mensaje como leído
export async function PATCH(request: NextRequest) {
  try {
    const { index, read } = await request.json();
    const messagesPath = getMessagesPath();

    if (!fs.existsSync(messagesPath)) {
      return NextResponse.json({ error: "No hay mensajes" }, { status: 404 });
    }

    const content = fs.readFileSync(messagesPath, "utf-8");
    const messages = JSON.parse(content);

    // El index viene invertido porque mostramos más recientes primero
    const realIndex = messages.length - 1 - index;

    if (realIndex < 0 || realIndex >= messages.length) {
      return NextResponse.json({ error: "Mensaje no encontrado" }, { status: 404 });
    }

    messages[realIndex].read = read;
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar mensaje:", error);
    return NextResponse.json(
      { error: "Error al actualizar mensaje" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar mensaje
export async function DELETE(request: NextRequest) {
  try {
    const { index } = await request.json();
    const messagesPath = getMessagesPath();

    if (!fs.existsSync(messagesPath)) {
      return NextResponse.json({ error: "No hay mensajes" }, { status: 404 });
    }

    const content = fs.readFileSync(messagesPath, "utf-8");
    const messages = JSON.parse(content);

    // El index viene invertido porque mostramos más recientes primero
    const realIndex = messages.length - 1 - index;

    if (realIndex < 0 || realIndex >= messages.length) {
      return NextResponse.json({ error: "Mensaje no encontrado" }, { status: 404 });
    }

    messages.splice(realIndex, 1);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar mensaje:", error);
    return NextResponse.json(
      { error: "Error al eliminar mensaje" },
      { status: 500 }
    );
  }
}
