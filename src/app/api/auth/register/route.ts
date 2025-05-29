import { NextRequest, NextResponse } from 'next/server'
import { userQueries } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    // Проверяем, не существует ли уже пользователь с таким email
    const existingUser = userQueries.findByEmail.get(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 409 }
      )
    }

    // Создаем нового пользователя
    const userId = `user-${Date.now()}`
    const registeredAt = new Date().toISOString()

    userQueries.create.run(
      userId,
      email,
      firstName,
      lastName,
      'user',
      phone || null,
      registeredAt,
      password
    )

    // Получаем созданного пользователя без пароля
    const newUser = userQueries.findById.get(userId) as any
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Ошибка регистрации:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 