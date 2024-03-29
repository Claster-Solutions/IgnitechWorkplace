"use client";

import CreateCurrentProduction from "./components/CreateCurrentProduction";
import CurrentProductionList from "./components/CurrentProdutionList";

export default function Production() {
  return (
    <div className="w-full flex flex-row justify-between">
      <CurrentProductionList />
      <CreateCurrentProduction />
    </div>
  );
}
