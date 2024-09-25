import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // Получение данных пользователя из auth() и вывод в консоль
    const { userId } = auth();  
    console.log("UserId:", userId);  

    // Проверка на авторизацию
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Извлечение данных из тела запроса
    const body = await req.json();
    const { name } = body;

    // Проверка на обязательность поля "name"
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Создание нового магазина в базе данных
    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    // Возвращение успешного ответа с созданным магазином
    return NextResponse.json(store);
  } catch (error) {
    // Логирование ошибки и возврат ответа с кодом 500
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
