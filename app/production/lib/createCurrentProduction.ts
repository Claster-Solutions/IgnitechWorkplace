import { CreateCurrentProductionModel } from './models/createCurrentProductionModel'

export async function createCurrentProduction(
  url: string,
  { arg }: { arg: { currentProductionModel: CreateCurrentProductionModel } }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg.currentProductionModel)
  }).then((res) => res.ok)
}
