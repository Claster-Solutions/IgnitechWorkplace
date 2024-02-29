export async function updateUser(
  url: string,
  { arg }: { arg: { userModel: UpdateUserModel } }
) {
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg.userModel),
  })
}
