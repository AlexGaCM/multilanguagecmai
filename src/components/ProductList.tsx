import useProducts from '../hooks/useProducts'
import ProductDetails from './ProductDetails'

export default function ProductList() {

  const [data, status] = useProducts()

  return(
   <>
    <div className='grid desktop:grid-cols-5 laptop:grid-cols-3 desktop:text-xl laptop:text-sl gap-y-8 gap-x-8 flex justify-center text-center'>
      {status === 'success'
        ?
        data.map((obj, index) =>
          <ProductDetails key={index} data={obj} />
        )
      :
        <></>
      }
    </div>
   </>
  )
}