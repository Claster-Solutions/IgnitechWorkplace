'use client'

import CreateCurrentProduction from './components/CreateCurrentProduction'
import CurrentProductionList from './components/CurrentProductionList'

export default function Production() {
  return (
    <div className="flex w-full flex-row justify-between ">
      <CurrentProductionList />
      <CreateCurrentProduction />
    </div>
  )
}
