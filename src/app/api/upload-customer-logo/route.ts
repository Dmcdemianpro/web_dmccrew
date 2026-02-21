import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const mimeToExt: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = Object.keys(mimeToExt)
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Use PNG, JPG, WebP o SVG.' },
        { status: 400 }
      )
    }

    // Limite 50MB
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es muy grande. Máximo 50MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
    const logosDir = path.join(DATA_DIR, 'uploads', 'logos')
    if (!existsSync(logosDir)) {
      await mkdir(logosDir, { recursive: true })
    }

    const originalExt = path.extname(file.name).toLowerCase() || mimeToExt[file.type] || '.png'
    const baseName = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .toLowerCase() || 'logo'
    const fileName = `${Date.now()}-${baseName}${originalExt}`
    const filePath = path.join(logosDir, fileName)

    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/logos/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    })
  } catch (error) {
    console.error('Error al subir logo del cliente:', error)
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    )
  }
}
