import useStore from '../storage/storage'
import Translate from './Translation'
import AddProductWindow from "./AddProductWindow";

export default function AddProductButton() {

  const { open, setOpen } = useStore()

  return(
    <>
      <div className='laptop:ml-[300px] desktop:ml-[340px]'>
        <button
          onClick={() => setOpen(!open)}
          className='mt-8 bg-blue-500 hover:bg-blue-400 text-white rounded py-1 px-2'
        >
          <Translate placeholder='add_product_button' />
        </button>
      </div>
      <AddProductWindow />
    </>
  )
}