import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Directorio externo persistente
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const CONTENT_DIR = path.join(DATA_DIR, 'content')
const TMP_DIR = path.join(DATA_DIR, 'tmp')
const CONTENT_FILE = path.join(CONTENT_DIR, "site.json");

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
async function ensureDirs() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(TMP_DIR, { recursive: true });
}

// GET - Load content from JSON file
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await ensureDirs();

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
    await ensureDirs();

    // Autenticación simple basada en cookie (mismo flag que el admin)
    const cookie = request.headers.get('cookie') || ''
    const isAuth = cookie.includes('dmcAdminAuth=true')
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    // Write safely: tmp then rename (atomic)
    const tmpPath = path.join(TMP_DIR, `site-${Date.now()}.tmp`)
    const data = JSON.stringify(cleanedContent, null, 2)
    await fs.writeFile(tmpPath, data, 'utf-8')
    await fs.rename(tmpPath, CONTENT_FILE)

    return NextResponse.json({ success: true, message: "Content saved successfully" });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Error saving content" },
      { status: 500 }
    );
  }
}
