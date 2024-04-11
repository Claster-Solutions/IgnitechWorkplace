import { PutCurrentProductionModel } from './models/putCurrentProductionModel'

export async function putCurrentProduction(
  url: string,
  { arg }: { arg: { newCurrentProduction: PutCurrentProductionModel } }
) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg.newCurrentProduction)
  }).then((res) => res.ok)
}
