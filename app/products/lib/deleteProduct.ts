export async function deleteProduct(
  url: string,
  { arg }: { arg: { productId: string } }
) {
  return fetch(url + `?id=${arg.productId}`, {
    method: 'DELETE',
  }).then((res) => res.ok)
}
