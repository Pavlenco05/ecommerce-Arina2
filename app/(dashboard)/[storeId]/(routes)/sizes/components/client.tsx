"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { SizeColumn, columns } from "./columns";

interface SizesCleintProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesCleintProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="my-4">
        <input
          type="text"
          placeholder="Search sizes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm p-2 border rounded"
        />
      </div>
      <DataTable searchKey="name" columns={columns} data={filteredData} />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};