import useProducts from '../hooks/useProducts'
import ProductDetails from './ProductDetails'

export default function ProductList() {

  const [ data, status ] = useProducts()

  const cutText = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1).trim() + '...' : str
  }

  return(
   <>
    <div className='grid desktop:grid-cols-5 laptop:grid-cols-3 desktop:text-xl laptop:text-sl gap-y-8 gap-x-8 flex justify-center text-center'>
     { status == 'success' ?

         data.map((obj, index) => {
           if (index % 2 === 0) {
             return (
               <div key={index}
                    className={`grid grid-cols-1 place-items-center grid-rows-10 bg-slate-50 border border-slate-400 font-light rounded`}>
                 <div className='p-4 row-span-2 flex desktop:h-[240px] laptop:h-[200px]'>
                   <img
                     src={`/img/Bild${obj.picture + 1}.png`}
                     className='text-slate-400 rounded border border-slate-400'
                     alt='product_picture'
                   />
                 </div>
                 <div className='hover:text-slate-500 border-b border-slate-400 px-4 pb-2 w-full rounded-full font-semibold group'>
                   <ProductDetails data={obj}/>
                 </div>
                 <div className='py-2'>{parseFloat(obj.price).toFixed(2).toString().replace('.', ',')}€</div>
                 <div className='border-b border-slate-300 px-4 w-[90%]'></div>
                 <div className='py-2'>{cutText(obj.desc, 24)}</div>
               </div>
             )
           } else if (index % 2 === 1) {
             return (
               <div key={index}
                    className={`grid grid-cols-1 place-items-center grid-rows-10 bg-slate-50 border border-slate-400 font-light rounded`}>
                 <div className='py-2'>{cutText(obj.desc, 24)}</div>
                 <div className='border-b border-slate-300 px-4 w-[90%]'></div>
                 <div className='py-2'>{parseFloat(obj.price).toFixed(2).toString().replace('.', ',')}€</div>
                 <div className='hover:text-slate-500 border-t border-slate-400 px-4 pt-2 w-full rounded-full font-semibold group'>
                  <ProductDetails data={obj}/>
                 </div>
                 <div className='p-4 row-span-2 flex desktop:h-[240px] laptop:h-[200px]'>
                   <img
                     src={`/img/Bild${obj.picture + 1}.png`}
                     className='text-slate-400 rounded border border-slate-400'
                     alt='product_picture'
                   />
                 </div>
               </div>
             )
           }
         })
       :
         <></>
     }
    </div>
   </>
  )
}