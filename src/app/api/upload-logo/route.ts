import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync, readdirSync } from 'fs'
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

    // Validar tamaño (máximo 50MB)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es muy grande. Máximo 50MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Obtener extensión original
    const ext = path.extname(file.name).toLowerCase() || '.png'

    // Nombre fijo para el logo
    const fileName = `logo${ext}`

    // Asegurar que existe la carpeta public
    const publicDir = path.join(process.cwd(), 'public')
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true })
    }

    // Eliminar logos anteriores con otras extensiones
    const logoExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
    for (const logoExt of logoExtensions) {
      const oldLogoPath = path.join(publicDir, `logo${logoExt}`)
      if (existsSync(oldLogoPath) && logoExt !== ext) {
        try {
          await unlink(oldLogoPath)
        } catch (e) {
          // Ignorar errores al eliminar
        }
      }
    }

    // Guardar archivo (sobrescribe si existe)
    const filePath = path.join(publicDir, fileName)
    await writeFile(filePath, buffer)

    // Retornar la URL pública del archivo
    // Agregar timestamp para evitar caché del navegador
    const publicUrl = `/${fileName}?v=${Date.now()}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Error al subir logo:', error)
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    )
  }
}
