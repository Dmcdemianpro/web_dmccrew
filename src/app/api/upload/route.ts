import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const saveAs = formData.get('saveAs') as string | null

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

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = path.extname(file.name).toLowerCase() || '.png'

    let filePath: string
    let publicUrl: string

    // Si saveAs es "logo", guardar como /public/logo.ext (reemplaza el anterior)
    if (saveAs === 'logo') {
      const fileName = `logo${ext}`
      filePath = path.join(process.cwd(), 'public', fileName)
      publicUrl = `/${fileName}?v=${Date.now()}`
    } else {
      // Guardar en uploads con nombre único
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const fileName = `img-${timestamp}-${randomStr}${ext}`

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true })
      }

      filePath = path.join(uploadsDir, fileName)
      publicUrl = `/uploads/${fileName}`
    }

    // Guardar archivo
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: path.basename(filePath)
    })

  } catch (error) {
    console.error('Error al subir archivo:', error)
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    )
  }
}
