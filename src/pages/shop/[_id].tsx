export async function getStaticPaths() {
  const products = await fetch('http://localhost:3000/api/callProducts').then(res => res.json())

  return {
    paths: products.map(product => {
      const productID = product._id
      return {
        params: {
          _id: productID
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const data = await fetch('http://localhost:3000/api/callProducts').then(res => res.json())
  const id = context.params._id

  return {
    props: {
      data: data,
      id: id,
    }
  }
}

export default function Product(props) {

  const product = props.data.find(obj => {
    return obj._id === props.id
  })

  return (
    <>
      <div className='mb-6'>
        <p>
          {product.name}
        </p>
        <p>
          {product.desc}
        </p>
        <p>
          {product.price}€
        </p>
      </div>
    </>
  )
}