import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

// Función para detectar URLs de placeholder rotas
function isBrokenPlaceholderUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false
  const lowerValue = value.toLowerCase()
  return (
    lowerValue.includes('placeholder.com') ||
    lowerValue.includes('via.placeholder') ||
    lowerValue.includes('400x300?text=') ||
    lowerValue.includes('800x600?text=') ||
    lowerValue.includes('placehold.co') ||
    lowerValue.includes('placeholdit')
  )
}

// Función recursiva para limpiar URLs de placeholder rotas del contenido
function cleanBrokenUrls<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj

  if (typeof obj === 'string') {
    return isBrokenPlaceholderUrl(obj) ? ('' as unknown as T) : obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cleanBrokenUrls(item)) as unknown as T
  }

  if (typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanBrokenUrls(value)
    }
    return cleaned as T
  }

  return obj
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// GET - Load content from JSON file
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await ensureDataDir();

    try {
      const content = await fs.readFile(CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(content);
      // Limpiar URLs de placeholder rotas antes de enviar
      const cleaned = cleanBrokenUrls(parsed);
      return NextResponse.json(cleaned);
    } catch {
      // File doesn't exist yet, return null
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST - Save content to JSON file
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();

    const content = await request.json();

    // Validate content structure (basic validation)
    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { error: "Invalid content format" },
        { status: 400 }
      );
    }

    // Limpiar URLs de placeholder rotas antes de guardar
    const cleanedContent = cleanBrokenUrls(content);

    // Save content to file
    await fs.writeFile(CONTENT_FILE, JSON.stringify(cleanedContent, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Content saved successfully" });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Error saving content" },
      { status: 500 }
    );
  }
}
