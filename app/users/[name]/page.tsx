"use client";

import { fetcher } from "@/constants";
import { User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { putUser } from "./lib/putUser";
import Notiflix from "notiflix";

export default function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { trigger, isMutating } = useSWRMutation("/api/users", putUser);
  const { data, isLoading, error } = useSWR<User>(
    `/api/users?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  }, [data]);

  if (!id) return <p>cant find id</p>;

  const handleOnSave = async () => {
    if (firstName === "" && lastName === "") {
      return;
    }

    const body: PutUserModel = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const result = await trigger({ userModel: body });
    try {
      switch (result) {
        case true:
          Notiflix.Notify.success("Úspěch");
          break;
        case false:
          Notiflix.Notify.failure("Došlo k chybě");
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error při editaci uživatele: ${error}`);
    }
  };

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-col space-y-4 w-1/4">
        <input
          type="text"
          value={firstName}
          className="p-2 rounded bg-slate-200"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          value={lastName}
          className="p-2 rounded bg-slate-200"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="text"
          value={email}
          className="p-2 rounded bg-slate-200"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="p-2 bg-slate-200 rounded"
          disabled={isMutating}
          onClick={() => {
            handleOnSave();
          }}
        >
          Uložit
        </button>
      </div>
    </div>
  );
}
