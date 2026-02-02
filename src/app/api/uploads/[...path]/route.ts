import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Mapeo de extensiones a tipos MIME
const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params
    const fileName = pathSegments.join('/')

    // Validar que no haya path traversal
    if (fileName.includes('..') || fileName.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    // Construir ruta al archivo (usar DATA_DIR igual que upload)
    const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
    const filePath = path.join(DATA_DIR, 'uploads', fileName)

    // Verificar que existe
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Leer el archivo
    const fileBuffer = await readFile(filePath)

    // Determinar tipo MIME
    const ext = path.extname(fileName).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    // Retornar el archivo con headers apropiados
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving upload:', error)
    return NextResponse.json({ error: 'Error serving file' }, { status: 500 })
  }
}
