import useSWRMutation from "swr/mutation";
import { createCurrentProduction } from "../lib/createCurrentProduction";
import { useEffect, useState } from "react";
import { CurrentProductionStatus, Product } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/constants";
import ComboBox, { ComboBoxItem } from "@/app/components/ComboBox";

export default function CreateCurrentProduction() {
  const { trigger, isMutating } = useSWRMutation(
    "api/current-production",
    createCurrentProduction
  );

  const { data, mutate } = useSWR<Product[]>("/api/products", fetcher);

  const [products, setProducts] = useState<ComboBoxItem[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ComboBoxItem | null>(
    null
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const items: ComboBoxItem[] = data.map((item) => {
      return {
        id: item.id,
        title: item.name,
      } as ComboBoxItem;
    });

    setProducts(items);

    if (items.length > 0) {
      setSelectedProduct(items[0]);
    }
  }, [data]);

  const [productCount, setProductCount] = useState(0);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(CurrentProductionStatus);

  // TODO: - Finish create product form

  return (
    <div className="flex flex-col space-y-6 w-1/4">
      <label className="flex flex-col space-y-1">
        Produkt
        <ComboBox
          items={products}
          selectedItem={selectedProduct}
          setSelectedItem={setSelectedProduct}
        />
      </label>
      <label className="flex flex-col space-y-1"></label>
      <label className="flex flex-col space-y-1"></label>
      <label className="flex flex-col space-y-1"></label>
    </div>
  );
}
