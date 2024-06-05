import useSWRMutation from 'swr/mutation'
import { putCurrentProduction } from '../lib/putCurrentProduction'
import useSWR from 'swr'
import CurrentProductionCard from './CurrentProductionCard'
import { ProductionWithRel, fetcher } from '@/constants'

export default function CurrentProductionList() {
  const { trigger, isMutating } = useSWRMutation('/api/production', putCurrentProduction)
  const { data, isLoading } = useSWR<ProductionWithRel[]>('api/production', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true
  })

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="flex w-2/6 flex-col space-y-4">
      {data.map((currentProduction) => {
        return <CurrentProductionCard data={currentProduction} key={currentProduction.id} />
      })}
    </div>
  )
}
