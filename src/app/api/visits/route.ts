import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const VISITS_FILE = path.join(DATA_DIR, 'visits.json')

interface VisitsData {
  count: number
  lastUpdated: string
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function getVisits(): Promise<VisitsData> {
  try {
    const data = await fs.readFile(VISITS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { count: 0, lastUpdated: new Date().toISOString() }
  }
}

async function saveVisits(data: VisitsData) {
  await ensureDir()
  await fs.writeFile(VISITS_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// GET - Obtener contador actual
export async function GET() {
  try {
    const visits = await getVisits()
    return NextResponse.json(visits)
  } catch (error) {
    console.error('Error reading visits:', error)
    return NextResponse.json({ count: 0, lastUpdated: null }, { status: 500 })
  }
}

// POST - Incrementar contador
export async function POST() {
  try {
    const visits = await getVisits()
    visits.count += 1
    visits.lastUpdated = new Date().toISOString()
    await saveVisits(visits)
    return NextResponse.json(visits)
  } catch (error) {
    console.error('Error updating visits:', error)
    return NextResponse.json({ error: 'Error updating visits' }, { status: 500 })
  }
}
