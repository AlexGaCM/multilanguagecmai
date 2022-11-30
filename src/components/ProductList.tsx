import useProducts from '../hooks/useProducts'
import ProductDetails from "./ProductDetails";

export default function ProductList() {

  const [ data, status ] = useProducts()

  const cutText = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str
  }

  if (status === 'success') console.log('data:', data)

  return(
   <>
    <div className='grid desktop:grid-cols-5 laptop:grid-cols-3 desktop:text-xl laptop:text-sl gap-y-8 gap-x-8 flex justify-center text-center'>
     { status == 'success' ?

         data.map((obj, index) =>
           <div key={index} className={'grid grid-cols-1 grid-rows-10 bg-slate-200 rounded border border-slate-900'}>
             <div className='p-4 row-span-2'>
              <img src='/img/Bild2.png' className='text-slate-400 rounded border border-slate-500' alt='product_picture' />
             </div>
             <div className='border-b border-slate-300 mx-4'></div>
             <p className='py-2'>{obj.name}</p>
             <div className='border-b border-slate-300 mx-4'></div>
             <p className='py-2'>{obj.price}€</p>
             <div className='border-b border-slate-300 mx-4'></div>
             <p className='py-2'>{cutText(obj.desc, 28)}</p>
             <div className='border-b border-slate-300 mx-4'></div>
             <ProductDetails data={obj} />
           </div>
         )
       :
         <></>
     }
    </div>
   </>
  )
}