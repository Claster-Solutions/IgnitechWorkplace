export async function updateUser(url: string, { arg }: { arg: UpdateUserModel }) {
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
  })
}
