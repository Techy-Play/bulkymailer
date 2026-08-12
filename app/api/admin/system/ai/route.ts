import { NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { getRegistryStatus } from '@/lib/ai/model-registry'

export async function GET(req: Request) {
  try {
    const admin = await requireSuperAdmin()
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const status = getRegistryStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error('[ADMIN_SYSTEM_AI_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
