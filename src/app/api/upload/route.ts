import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Mapeo simple para extraer extensión desde el tipo MIME cuando el nombre del archivo no la trae
const mimeToExt: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
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
        { error: 'Tipo de archivo no permitido. Use PNG, JPG, GIF, WebP o SVG.' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es muy grande. Máximo 5MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Asegurar carpeta /public/uploads existe
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generar nombre de archivo seguro y único
    const originalExt = path.extname(file.name).toLowerCase() || mimeToExt[file.type] || '.png'
    const baseName = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .toLowerCase() || 'upload'
    const fileName = `${Date.now()}-${baseName}${originalExt}`
    const filePath = path.join(uploadsDir, fileName)

    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    })

  } catch (error) {
    console.error('Error al subir archivo:', error)
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    )
  }
}
