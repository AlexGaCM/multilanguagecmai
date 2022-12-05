import useProducts from '../hooks/useProducts'
import ProductDetails from "./ProductDetails";

export default function ProductList() {

  const [ data, status ] = useProducts()

  const cutText = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1).trim() + '...' : str
  }

  return(
   <>
    <div className='grid desktop:grid-cols-5 laptop:grid-cols-3 desktop:text-xl laptop:text-sl gap-y-8 gap-x-8 flex justify-center text-center'>
     { status == 'success' ?

         data.map((obj, index) =>
           <div key={index} className={'grid grid-cols-1 place-items-center grid-rows-10 bg-slate-100 rounded-xl border border-slate-900'}>
             <div className='p-4 row-span-2 flex h-[240px]'>
              <img src={`/img/Bild${obj.picture+1}.png`} className='text-slate-400 rounded-xl border border-slate-500' alt='product_picture' />
             </div>
             <div className='border-b border-slate-900 px-4 pb-2 w-full rounded-full'>{cutText(obj.name, 32)}</div>
             <p className='py-2'>{obj.price}€</p>
             <div className='border-b border-slate-300 px-4 w-[90%]'></div>
             <p className='py-2'>{cutText(obj.desc, 24)}</p>
             <div className='border-b border-slate-300 px-4 w-[90%]'></div>
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