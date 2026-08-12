import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser, hashPassword } from '@/lib/auth'
import { requireSuperAdmin } from '@/lib/auth/organization-context'

function generateTempPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let result = ''
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireSuperAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const tempPassword = generateTempPassword()
    const passwordHash = await hashPassword(tempPassword)

    await db.user.update({
      where: { id },
      data: { passwordHash },
    })

    return NextResponse.json({ password: tempPassword })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
