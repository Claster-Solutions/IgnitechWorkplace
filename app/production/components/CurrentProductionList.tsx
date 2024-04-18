import useSWRMutation from 'swr/mutation'
import { putCurrentProduction } from '../lib/putCurrentProduction'
import useSWR from 'swr'
import { CurrentProduction } from '@prisma/client'
import CurrentProductionCard from './CurrentProductionCard'
import { CurrentProductionWithProductAndStatus, fetcher } from '@/constants'

export default function CurrentProductionList() {
  const { trigger, isMutating } = useSWRMutation('/api/current-production', putCurrentProduction)
  const { data, isLoading } = useSWR<CurrentProductionWithProductAndStatus[]>('api/current-production', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true
  })

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  console.log(data)

  return (
    <div className="flex w-2/6 flex-col space-y-4">
      {data.map((currentProduction) => {
        return <CurrentProductionCard data={currentProduction} key={currentProduction.id} />
      })}
    </div>
  )
}
