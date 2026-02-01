import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
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

    // Crear nombre único para el archivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Obtener extensión original y crear nombre único
    const ext = path.extname(file.name) || '.png'
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const fileName = `img-${timestamp}-${randomStr}${ext}`

    // Asegurar que existe la carpeta uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Guardar archivo
    const filePath = path.join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Retornar la URL pública del archivo (estática desde /public/uploads)
    const publicUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Error al subir archivo:', error)
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    )
  }
}
