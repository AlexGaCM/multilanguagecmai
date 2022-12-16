import { ObjectId } from 'mongodb'
import { useRouter } from 'next/router'

type Props = {
  data: {
    _id: ObjectId,
    name: string,
    price: any,
    desc: string,
    picture: number
  }
}

export default function ProductDetails({data}: Props) {

  const router = useRouter()
  const cutText = (str, n) => (str.length > n) ? str.slice(0, n-1).trim() + '...' : str

  const handleMoreInfo = () => router.push(`/shop/${data._id}`)

  return(
    <>
      <button onClick={() => handleMoreInfo()}>
        <div className='grid grid-cols-1 place-items-center grid-rows-10 bg-slate-50 border border-slate-400 hover:bg-slate-100 active:bg-slate-200 font-light rounded'>
          <div className='p-4 row-span-2 flex desktop:h-[240px] laptop:h-[200px]'>
            <img
              src={`/img/Bild${data.picture + 1}.png`}
              className='text-slate-400 rounded border border-slate-400 bg-slate-50'
              alt='product_picture'
            />
          </div>
          <div className='hover:text-slate-500 border-b border-slate-400 px-4 pb-2 w-full rounded-full font-semibold'>
            <span className='px-4 py-1 rounded-md'>{cutText(data.name , 30)}
            </span>
          </div>
          <div className='py-2'>{parseFloat(data.price).toFixed(2).toString().replace('.', ',')}€</div>
          <div className='border-b border-slate-300 px-4 w-[90%]'></div>
          <div className='py-2'>{cutText(data.desc, 24)}</div>
        </div>
      </button>
    </>
  )
}