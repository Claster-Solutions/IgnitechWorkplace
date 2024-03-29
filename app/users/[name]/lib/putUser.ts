export async function putUser(
  url: string,
  { arg }: { arg: { userModel: PutUserModel } }
) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg.userModel),
  }).then((res) => res.ok);
}
