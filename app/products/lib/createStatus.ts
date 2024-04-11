export async function createStatus(url: string, { arg }: { arg: { statusModel: CreateStatusModel } }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg.statusModel)
  }).then((res) => res.ok)
}
