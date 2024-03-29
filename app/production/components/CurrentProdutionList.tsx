import useSWRMutation from "swr/mutation";
import { putCurrentProduction } from "../lib/putCurrentProduction";
import { fetcher } from "@/constants";
import useSWR from "swr";
import { CurrentProduction } from "@prisma/client";

export default function CurrentProductionList() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/current-production",
    putCurrentProduction
  );
  const { data, isLoading } = useSWR<CurrentProduction[]>(
    "api/current-production",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  if (isLoading) return <p>loading</p>;
  if (!data) return <p>error</p>;

  return (
    <div className="w-2/6 flex flex-col space-y-4">
      {data.map((currentProduction) => {
        return (
          <div
            className="flex flex-row w-full bg-slate-300 rounded p-4"
            key={currentProduction.id}
          ></div>
        );
      })}
    </div>
  );
}
