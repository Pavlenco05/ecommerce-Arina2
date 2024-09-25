import React from "react";
import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form"; // Убедитесь, что SettingsForm экспортируется правильно

const BillboardPage = async ({ 
  params 
}: { 
  params: { billboardId: string } 
}) => {
  // Получаем данные конкретного билборда из базы данных
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    },
  });

  // Проверка наличия данных
  if (!billboard) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <p>Billboard not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
