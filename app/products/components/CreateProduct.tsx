import useSWRMutation from "swr/mutation";
import { createProduct } from "../lib/createProduct";
import { useState } from "react";
import Notiflix from "notiflix";

export default function CreateProduct() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/products",
    createProduct
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOnSave = async () => {
    try {
      const model: CreateProductModel = {
        name: name,
        description: description,
      };

      const result = await trigger({ productModel: model });
      switch (result) {
        case true:
          Notiflix.Notify.success("Produkt úspěšně vytvořen");
          setName("");
          setDescription("");
          break;
        case false:
          Notiflix.Notify.failure("Error při vytváření produktu");
          break;
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error při vytváření produktu: ${error}`);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-1/4">
      <label className="flex flex-col space-y-1">
        Název
        <input
          type="text"
          value={name}
          className="p-2 rounded bg-slate-200"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label className="flex flex-col space-y-1">
        Popisek
        <input
          type="text"
          value={description}
          className="p-2 rounded bg-slate-200"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
      <button
        className={`p-2 ${
          isMutating ? "bg-slate-100" : "bg-slate-200"
        } rounded`}
        disabled={isMutating}
        onClick={() => {
          handleOnSave();
        }}
      >
        Uložit
      </button>
    </div>
  );
}
