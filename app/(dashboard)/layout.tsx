import React from 'react'; // Добавить импорт React
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb'; // Убедись, что файл существует
import Navbar from '@/components/navbar'; // Убедись, что файл существует и регистр совпадает

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
