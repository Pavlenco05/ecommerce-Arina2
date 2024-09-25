import { format } from "date-fns";
import React from "react";

import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns"; // Проверьте, что этот импорт существует

const BillboardsPage = async ({
    params 
}: {
    params: { storeId: string }
}) => {
    try {
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });
        const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
            id: item.id,
            label: item.label,
            createdAt: format(new Date(item.createdAt), "MMMM do, yyyy") 
        }));

        return (
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <BillboardClient data={formattedBillboards} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Ошибка при получении данных о билбордах:", error);
        return <div>Произошла ошибка при загрузке данных о билбордах.</div>;
    }
}

export default BillboardsPage;
