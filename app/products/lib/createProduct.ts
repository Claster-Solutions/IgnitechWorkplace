export async function createProduct(url: string, { arg }: { arg: { productModel: CreateProductModel } }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg.productModel)
  }).then((res) => res.ok)
}
