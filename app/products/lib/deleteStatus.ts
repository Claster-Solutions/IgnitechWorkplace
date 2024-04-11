export async function deleteStatus(url: string, { arg }: { arg: { statusId: string } }) {
  return fetch(url + `?id=${arg.statusId}`, {
    method: 'DELETE'
  }).then((res) => res.ok)
}
