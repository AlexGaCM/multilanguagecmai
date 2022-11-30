import useStore from '../storage/storage'
import Translate from './Translation'
import { useRef } from 'react'
import useProducts from '../hooks/useProducts'

export default function AddProductWindow() {

  const { product, open, setProduct, setOpen } = useStore()
  const picturesArr = ['Bild1', 'Bild2', 'Bild3', 'Bild4', 'Bild5', 'Bild6']
  const inputRef = useRef(null)
  // const [ data ] = useProducts()

  const handleSubmit = () => {

    const objArr = Object.entries(product)
    let bool = false

    for (const [key, value] of objArr) {
      if (value.trim() === '' && key != '_id') {
        alert("ERROR! input cant be empty")
        bool = false
        break
      } else {
        bool = true
      }
    }

    if (bool) {
      setOpen(!open)
      console.log(product)
    }

  }

  return(
    <>
      <div className={ open ? 'fixed h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
      <div className={ open ? 'fixed h-screen w-screen top-0 backdrop-blur-sm' : 'hidden' }>
        <div className='flex desktop:mt-[13%] laptop:mt-[6%] justify-center place-content-center'>
          <div>
            <div className='rounded-t-xl bg-blue-500 h-12 w-full'>
              <button className='rounded-tr-xl float-right h-full w-12 text-white hover:bg-blue-400' onClick={() => setOpen(!open)}>
                X
              </button>
            </div>
            <div className='rounded-b-xl bg-slate-50 w-[960px] h-[540px]'>
              <div className='justify-left flex pt-12'>
                <div className='grid grid-cols-2 gap-y-8 gap-x-4 text-right'>
                  <p className=''>ID:</p>
                  <input readOnly defaultValue={product._id} className='border-slate-600 border rounded w-64 text-slate-600 bg-slate-200' />
                  <p className=''>Produktname:</p>
                  <input ref={inputRef} className='border-slate-600 border rounded w-64' onChange={(e) => {
                    product.name = e.target.value
                  }} />
                  <p className=''>Preis:</p>
                  <input defaultValue='' className='border-slate-600 border rounded w-64' onChange={(e) => {
                    product.price = e.target.value
                  }} />
                  <p className=''>Beschreibung:</p>
                  <textarea defaultValue='' className='resize-none border-slate-600 border rounded w-64 h-64' onChange={(e) => {
                    product.desc = e.target.value
                  }} />
                </div>
                <div className='ml-16'>
                  <p className=''>Bild:</p>
                  <select defaultValue='' className='w-64 border border-slate-500 rounded' onChange={(e) => product.picture = e.target.value}>
                    <option value=''><Translate placeholder='select_dropdown'/></option>
                    {picturesArr.map((picture, index ) =>
                      <option value={index} key={index}>{picture}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='float-right flex gap-x-4 mt-1 mr-6'>
                <button
                  className='border-slate-400 hover:bg-slate-400 hover:text-white border-2 rounded-md h-10 w-24'
                  onClick={() => setOpen(!open)}
                >
                  <Translate placeholder='dialog_close' />
                </button>
                <button
                  type="submit"
                  className='bg-emerald-500 hover:bg-emerald-400 text-white rounded-md h-10 w-24'
                  onClick={() => handleSubmit()}
                >
                  <Translate placeholder='dialog_submit' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}