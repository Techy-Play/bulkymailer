import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser, hashPassword } from '@/lib/auth'
import { requireSuperAdmin } from '@/lib/auth/organization-context'
import { z } from 'zod'

const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['OWNER', 'ADMIN', 'EDITOR', 'MEMBER']),
})

export async function POST(req: Request) {
  try {
    const user = await requireSuperAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = createUserSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.issues[0].message }, { status: 400 })
    }

    const { firstName, lastName, email, password, role } = validatedData.data

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role,
        status: 'ACTIVE',
        emailVerified: true,
        isOnboardingCompleted: true,
      },
    })

    return NextResponse.json({ success: true, user: { id: newUser.id } })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
